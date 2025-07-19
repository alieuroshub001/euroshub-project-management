// src/models/task/TaskHistory.model.ts

import { Schema, model, Document } from 'mongoose';

export interface ITaskHistory extends Document {
  taskId: Schema.Types.ObjectId;
  changedBy: Schema.Types.ObjectId;
  action: string;
  field?: string;
  oldValue?: any;
  newValue?: any;
}

const taskHistorySchema = new Schema<ITaskHistory>(
  {
    taskId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Task', 
      required: true 
    },
    changedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    action: { 
      type: String, 
      required: true,
      trim: true 
    },
    field: { 
      type: String, 
      trim: true 
    },
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

// Indexes
taskHistorySchema.index({ taskId: 1 });
taskHistorySchema.index({ changedBy: 1 });
taskHistorySchema.index({ action: 1, field: 1 });
taskHistorySchema.index({ createdAt: -1 });

export const TaskHistory = model<ITaskHistory>('TaskHistory', taskHistorySchema);