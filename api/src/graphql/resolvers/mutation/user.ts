import models from "../../../mongodb/schemas";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User } = models;

const generateToken = ({ id, email }) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
}

const userMutation = {
  createUser: async (parent, input, context) => {
    try {
      const { email, username, password } = input;

      // Check if user already exists
      const userExists = await User.findOne({
        $or: [{ email }, { username }]
      });
      if (userExists) {
        return {
          success: false,
          error: 'User already exists'
        }
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user
      const newUser = new User({
        email,
        username,
        password: hashedPassword
      });

      const user = await newUser.save();

      return {
        success: true,
        user,
        token: generateToken(user)
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
  loginUser: async (parent, input) => {
    try {
      const { email, password } = input;

      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        return {
          success: false,
          error: 'Invalid credentials'
        }
      }

      // Check the password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return {
          success: false,
          error: 'Invalid credentials'
        }
      }

      return {
        success: true,
        user,
        token: generateToken(user)
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
  updateUser: async (parent, input, { user }) => {
    try {
      await user.update(input);
      return {
        success: true,
        user
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },
  deleteUser: async (parent, input, { user }) => {
    try {
      await user.remove();
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}

module.exports = userMutation;