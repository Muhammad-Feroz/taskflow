import model from '../../../mongodb/schemas';
const { User } = model;

const userResolver = {
  Query: {
    user: async (parent, { id }, context) => {
      return User.findById(id);
    },
    users: async (parent, input, content) => {
      return User.find();
    }
  }
}

module.exports = userResolver;