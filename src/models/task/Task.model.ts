// src/models/task/Task.model.ts

import { Schema, model, Document } from 'mongoose';
import { Priority, Status } from '../../types/common';

export interface ITask extends Document {
  projectId: Schema.Types.ObjectId;
  title: string;
  description: string;
  assigneeId?: Schema.Types.ObjectId;
  reporterId: Schema.Types.ObjectId;
  status: 'todo' | 'in-progress' | 'in-review' | 'done' | Status;
  priority: Priority;
  dueDate?: Date;
  labels?: string[];
  estimatedHours?: number;
  actualHours?: number;
  dependencies?: Schema.Types.ObjectId[];
  attachments?: string[];
  coverImage?: string;
  completedAt?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    projectId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true 
    },
    title: { 
      type: String, 
      required: true, 
      trim: true,
      maxlength: 200 
    },
    description: { 
      type: String, 
      trim: true,
      maxlength: 5000 
    },
    assigneeId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    reporterId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'in-review', 'done', 'active', 'inactive', 'pending', 'archived'],
      default: 'todo'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    dueDate: { type: Date },
    labels: [{ 
      type: String, 
      trim: true,
      lowercase: true 
    }],
    estimatedHours: { 
      type: Number, 
      min: 0 
    },
    actualHours: { 
      type: Number, 
      min: 0 
    },
    dependencies: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Task' 
    }],
    attachments: [{ type: String }],
    coverImage: { type: String },
    completedAt: { type: Date }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
taskSchema.index({ projectId: 1 });
taskSchema.index({ assigneeId: 1 });
taskSchema.index({ reporterId: 1 });
taskSchema.index({ status: 1, priority: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ labels: 1 });
taskSchema.index({ title: 'text', description: 'text' });

export const Task = model<ITask>('Task', taskSchema);