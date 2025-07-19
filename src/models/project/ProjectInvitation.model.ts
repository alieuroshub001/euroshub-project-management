// src/models/project/ProjectInvitation.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IProjectInvitation extends Document {
  projectId: Schema.Types.ObjectId;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  token: string;
  expiresAt: Date;
  invitedBy: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'expired';
}

const projectInvitationSchema = new Schema<IProjectInvitation>(
  {
    projectId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true 
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
    },
    role: {
      type: String,
      enum: ['admin', 'member', 'viewer'],
      required: true
    },
    token: { 
      type: String, 
      required: true,
      unique: true 
    },
    expiresAt: { 
      type: Date, 
      required: true 
    },
    invitedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'expired'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

// Indexes
projectInvitationSchema.index({ token: 1 }, { unique: true });
projectInvitationSchema.index({ projectId: 1, email: 1 });
projectInvitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const ProjectInvitation = model<IProjectInvitation>('ProjectInvitation', projectInvitationSchema);