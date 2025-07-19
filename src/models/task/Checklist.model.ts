// src/models/task/Checklist.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IChecklistItem extends Document {
  taskId: Schema.Types.ObjectId;
  label: string;
  completed: boolean;
  completedAt?: Date;
  createdBy: Schema.Types.ObjectId;
}

const checklistItemSchema = new Schema<IChecklistItem>(
  {
    taskId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Task', 
      required: true 
    },
    label: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200 
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
    completedAt: { type: Date },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { timestamps: true }
);

// Indexes
checklistItemSchema.index({ taskId: 1 });
checklistItemSchema.index({ createdBy: 1 });
checklistItemSchema.index({ completed: 1 });

export const ChecklistItem = model<IChecklistItem>('ChecklistItem', checklistItemSchema);