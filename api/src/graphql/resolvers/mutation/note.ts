const noteMutation = {
  createNote: async (parent, { input }, { models, user }) => {
    try {
      const note = await models.Note.create({ ...input, user: user.id });
      return {
        success: true,
        note
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
  updateNote: async (parent, { id, input }, { models }) => {
    try {
      const note = await models.Note.findByIdAndUpdate(id, input, { new: true });
      return {
        success: true,
        note
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
  deleteNoteById: async (parent, { id }, { models }) => {
    try {
      const note = await models.Note.findByIdAndDelete(id);
      return {
        success: true,
        note
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
};

module.exports = noteMutation;