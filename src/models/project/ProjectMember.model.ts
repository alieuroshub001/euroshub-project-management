// src/models/project/ProjectMember.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IProjectMember extends Document {
  projectId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: Date;
}

const projectMemberSchema = new Schema<IProjectMember>(
  {
    projectId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true 
    },
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member', 'viewer'],
      default: 'member'
    },
    joinedAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  { timestamps: true }
);

// Compound unique index
projectMemberSchema.index({ projectId: 1, userId: 1 }, { unique: true });
projectMemberSchema.index({ userId: 1 });

export const ProjectMember = model<IProjectMember>('ProjectMember', projectMemberSchema);