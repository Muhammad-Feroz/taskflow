import model from '../../../mongodb/schemas';
const { Project, ProjectMembership, Task } = model;

const projectResolvers = {
  Query: {
    projects: async (parent, input, { user }) => {
      try {
        const projects = await ProjectMembership.find({ user: user.id }).populate('project');

        const newProjects = projects.map(project => {
          return {
            id: project.project.id,
            title: project.project.title,
            description: project.project.description,
            status: project.project.status,
          }
        });

        return newProjects
      } catch (error) {
        throw new Error(error.message);
      }
    },
    project: async (parent, { id }, { user }) => {
      try {
        const project = await Project.findById(id);

        if (!project) {
          throw new Error('Project not found');
        }

        const projectMembership = await ProjectMembership.findOne({ project: id, user: user.id });

        if (!projectMembership) {
          throw new Error('You are not a member of this project');
        }

        return project;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  Project: {
    users: async (parent) => {
      try {
        const projectMemberships = await ProjectMembership.find({ project: parent.id }).populate('user');

        const users = projectMemberships.map(projectMembership => {
          return {
            id: projectMembership.user.id,
            name: projectMembership.user.name,
            email: projectMembership.user.email,
          }
        });

        return users;
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },
    tasks: async (parent) => {
      try {
        const tasks = await Task.find({ project: parent.id });

        return tasks;
      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    }
  }
}

module.exports = projectResolvers