const noteType = `
  type Note {
    id: ID!
    title: String!
    content: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    notes: [Note]
    noteById(id: ID!): Note
  }

  extend type Mutation {
    createNote(input: NoteInput!): NotePayload
    updateNote(id: ID!, input: NoteInput!): NotePayload
    deleteNoteById(id: ID!): NotePayload
  }

  input NoteInput {
    title: String!
    content: String!
  }

  type NotePayload {
    success: Boolean!
    note: Note
    error: String
  }

`;

module.exports = noteType;