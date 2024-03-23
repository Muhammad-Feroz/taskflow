const userTypeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): UserPayload
    loginUser(email: String!, password: String!): UserPayload
    updateUser(username: String, email: String, password: String): UserPayload
    deleteUser(id: ID!): UserPayload
  }

  type UserPayload {
    success: Boolean!
    error: String
    token: String
    user: User
  }
`;

module.exports = userTypeDefs;