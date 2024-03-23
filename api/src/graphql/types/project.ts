const projectType = `
  type Project {
    id: ID!
    title: String!
    description: String
    status: String!
    tasks: [Task]
    users: [User]
  }

  type Query {
    projects: [Project]
    project(id: ID!): Project
  }

  type Mutation {
    createProject(input: ProjectInput!): ProjectPayload
    updateProject(id: ID!, input: UpdateProjectInput!): ProjectPayload
    deleteProject(id: ID!): ProjectPayload
  }

  input ProjectInput {
    title: String!
    description: String!
  }

  input UpdateProjectInput {
    title: String
    description: String
    status: String
    removeUser: ID
    addUser: ID
  }

  type ProjectPayload {
    success: Boolean!
    project: Project
    error: String
  }

`;

module.exports = projectType;