import model from "../../../mongodb/schemas";
const { Project, ProjectMembership } = model;

const projectMutation = {
  createProject: async (parent, { input }, { user }) => {
    try {
      const createProject = new Project({
        ...input,
        user: user.id
      });

      const project = await createProject.save();

      return {
        success: true,
        project
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
  updateProject: async (parent, { id, input }, { user }) => {
    try {
      const project = await Project.findById(id);

      if (!project) {
        throw new Error('Project not found');
      }

      if (project.user.toString() !== user.id) {
        throw new Error('You are not the owner of this project');
      }

      if (input.removeUser) {
        // remove user from project
        await ProjectMembership.findOneAndDelete({ project: id, user: input.removeUser });
      }

      if (input.addUser) {
        // add user to project
        const projectMembership = new ProjectMembership({
          project: id,
          user: input.addUser,
          role: 'member'
        });

        await projectMembership.save();
      }

      const updatedProject = await Project.findByIdAndUpdate(id, input, { new: true });

      return {
        success: true,
        project: updatedProject
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
  deleteProject: async (parent, { id }, { user }) => {
    try {
      const project = await Project.findById(id);

      if (!project) {
        throw new Error('Project not found');
      }

      if (project.user.toString() !== user.id) {
        throw new Error('You are not the owner of this project');
      }

      await Project.findOneAndDelete({ _id: id });

      return {
        success: true,
        project
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}

module.exports = projectMutation