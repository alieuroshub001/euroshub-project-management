// src/models/project/Project.model.ts

import { Schema, model, Document } from 'mongoose';
import { Visibility, Status } from '../../types/common';

export interface IProject extends Document {
  title: string;
  description: string;
  status: Status;
  visibility: Visibility;
  ownerId: Schema.Types.ObjectId;
  teamIds: Schema.Types.ObjectId[];
  tags?: string[];
  startDate?: Date;
  endDate?: Date;
  archivedAt?: Date;
  coverImage?: string;
  color?: string;
}

const projectSchema = new Schema<IProject>(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true,
      maxlength: 100 
    },
    description: { 
      type: String, 
      trim: true,
      maxlength: 2000 
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending', 'archived'],
      default: 'active'
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'team'],
      default: 'team'
    },
    ownerId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    teamIds: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    tags: [{ 
      type: String, 
      trim: true,
      lowercase: true 
    }],
    startDate: { type: Date },
    endDate: { type: Date },
    archivedAt: { type: Date },
    coverImage: { type: String },
    color: { 
      type: String,
      match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
projectSchema.index({ title: 'text', description: 'text' });
projectSchema.index({ ownerId: 1 });
projectSchema.index({ teamIds: 1 });
projectSchema.index({ status: 1, visibility: 1 });
projectSchema.index({ tags: 1 });

export const Project = model<IProject>('Project', projectSchema);