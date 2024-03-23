const taskMutation = {
  createTask: async (parent, { input }, { user, models }) => {
    try {
      const createTask = new models.Task({
        ...input,
        user: user.id
      });

      const task = await createTask.save();

      return {
        success: true,
        task
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
  updateTask: async (parent, { id, input }, { user, models }) => {
    try {
      const task = await models.Task.findById(id);

      if (!task) {
        throw new Error('Task not found');
      }

      const updatedTask = await models.Task.findByIdAndUpdate(id, input, { new: true });

      return {
        success: true,
        task: updatedTask
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
  deleteTask: async (parent, { id }, { user, models }) => {
    try {
      await models.Task.findByIdAndDelete(id);
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}

module.exports = taskMutation