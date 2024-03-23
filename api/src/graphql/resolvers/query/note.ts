const noteResolver = {
  Query: {
    notes: async (parent, args, { models, user }) => {
      return await models.Note.find({ user: user.id }).populate('user');
    },
    noteById: async (parent, { id }, { models, user }) => {
      return await models.Note.findById(id).populate('user');
    },
  }
}

module.exports = noteResolver