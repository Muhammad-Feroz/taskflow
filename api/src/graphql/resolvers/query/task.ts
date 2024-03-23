const taskResolver = {
  Query: {
    tasks: async (parent, { projectId }, { models }) => {
      return await models.Task.find({ project : projectId })
    },
    task: async (parent, { id }, { models }) => {
      return await models.Task.findById(id)
    }
  }
}

module.exports = taskResolver