import { Schema, model } from "mongoose";
import ProjectMembership from './ProjectMembership';
import Task from './Task';

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true
});

// create middleware to create a project membership when a project is created
ProjectSchema.post('save', async function (doc, next) {
  const projectMembership = new ProjectMembership({
    project: doc._id,
    user: doc.user,
    role: 'owner',
  });

  await projectMembership.save();

  next();
});

// create middleware to delete project memberships and tasks when a project is deleted
ProjectSchema.pre('findOneAndDelete', async function (next) {
  const project = await this.model.findOne(this.getFilter());

  await ProjectMembership.deleteMany({ project: project._id });
  await Task.deleteMany({ project: project._id });

  next();
});

const Project = model('Project', ProjectSchema);

export default Project;