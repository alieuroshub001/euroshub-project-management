// src/models/task/Task.model.ts

import { Schema, model, Document } from 'mongoose';

export interface ITaskComment extends Document {
  taskId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  content: string;
  mentions?: Schema.Types.ObjectId[];
  attachments?: string[];
  deletedAt?: Date;
}

const taskCommentSchema = new Schema<ITaskComment>(
  {
    taskId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Task', 
      required: true 
    },
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    content: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 2000 
    },
    mentions: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    attachments: [{ type: String }],
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

// Indexes
taskCommentSchema.index({ taskId: 1 });
taskCommentSchema.index({ userId: 1 });
taskCommentSchema.index({ mentions: 1 });

export const TaskComment = model<ITaskComment>('TaskComment', taskCommentSchema);