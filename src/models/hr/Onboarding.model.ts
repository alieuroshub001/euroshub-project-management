// src/models/hr/Onboarding.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IOnboardingTask extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  completedAt?: Date;
  assignedBy: Schema.Types.ObjectId;
}

const onboardingTaskSchema = new Schema<IOnboardingTask>(
  {
    userId: { 
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
    description: { 
      type: String, 
      trim: true,
      maxlength: 1000 
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
    dueDate: { type: Date },
    completedAt: { type: Date },
    assignedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { timestamps: true }
);

// Indexes
onboardingTaskSchema.index({ userId: 1 });
onboardingTaskSchema.index({ completed: 1 });
onboardingTaskSchema.index({ dueDate: 1 });

export const OnboardingTask = model<IOnboardingTask>('OnboardingTask', onboardingTaskSchema);