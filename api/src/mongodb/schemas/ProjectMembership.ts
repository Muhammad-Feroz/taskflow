import { Schema, model } from "mongoose";

const ProjectMembershipSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['owner', 'member'],
  },
}, {
  timestamps: true
});

const ProjectMembership = model('ProjectMembership', ProjectMembershipSchema);

export default ProjectMembership;