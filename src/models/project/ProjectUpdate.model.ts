// src/models/project/ProjectUpdate.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IProjectUpdate extends Document {
  projectId: Schema.Types.ObjectId;
  authorId: Schema.Types.ObjectId;
  title: string;
  content: string;
  attachments?: string[];
  pinned: boolean;
}

const projectUpdateSchema = new Schema<IProjectUpdate>(
  {
    projectId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true 
    },
    authorId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200 
    },
    content: { 
      type: String, 
      required: true,
      maxlength: 10000 
    },
    attachments: [{ type: String }],
    pinned: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

// Indexes
projectUpdateSchema.index({ projectId: 1 });
projectUpdateSchema.index({ authorId: 1 });
projectUpdateSchema.index({ pinned: 1, createdAt: -1 });

export const ProjectUpdate = model<IProjectUpdate>('ProjectUpdate', projectUpdateSchema);