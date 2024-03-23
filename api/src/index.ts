// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { GraphQLError } from 'graphql';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import models from './mongodb/schemas';

const { User } = models;

// Import our schema and resolvers
import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';
import './mongodb/connection';

interface MyContext {
  user?: {
    id: string;
    email: string;
  }
}

const verifyToken = async (token: string) => {
  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string, email: string };

  // Find the user
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new GraphQLError('Invalid token', {
      extensions: {
        code: 'UNAUTHENTICATED'
      }
    });
  }

  return user;
}

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();

  // connect to the database

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
    bodyParser.json({ limit: '50mb' }),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { operationName } = req.body;
        // If the operation is a login or register mutation, we don't need to check for a token
        if (['CreateUser', 'IntrospectionQuery', 'LoginUser'].includes(operationName)) {
          return {
            models
          };
        }

        // Get the token from the request headers
        const token = (req.headers.authorization || '').replace('Bearer ', '');
        // If there is no token, throw an authentication error
        if (!token) {
          throw new GraphQLError('You must be logged in to do that', {
            extensions: {
              code: 'UNAUTHENTICATED'
            }
          });
        }
        
        // If there is a token, verify it
        const user = await verifyToken(token);
        return {
          models,
          user
        };
      }
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

startApolloServer();