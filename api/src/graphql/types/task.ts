import { model } from "mongoose";

const taskType = `
  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    priority: String!
    assignedTo: User
    project: Project
  }

  extend type Query {
    tasks(projectId: ID!): [Task]
    task(id: ID!): Task
  }
  
  extend type Mutation {
    createTask(input: TaskInput!): TaskResponse
    updateTask(id: ID!, input: TaskInput!): TaskResponse
    deleteTask(id: ID!): TaskResponse
  }
  
  input TaskInput {
    title: String!
    description: String!
    status: String
    priority: String
    assignedTo: ID
    project: ID!
  }
  
  type TaskResponse {
    success: Boolean!
    task: Task
    error: String
  }
`;

module.exports = taskType;