// src/models/analytics/UserActivity.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IUserActivity extends Document {
  userId: Schema.Types.ObjectId;
  date: Date;
  sessions: number;
  featuresUsed: string[];
  devices: string[];
  lastActive: Date;
  activityScore: number;
}

const userActivitySchema = new Schema<IUserActivity>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    date: { 
      type: Date, 
      required: true,
      index: true 
    },
    sessions: { 
      type: Number, 
      min: 0,
      default: 1 
    },
    featuresUsed: [{ 
      type: String, 
      trim: true,
      lowercase: true 
    }],
    devices: [{ type: String }],
    lastActive: { 
      type: Date, 
      required: true 
    },
    activityScore: { 
      type: Number, 
      min: 0, 
      max: 100,
      default: 0 
    }
  },
  { timestamps: true }
);

// Compound index for user daily activity
userActivitySchema.index({ userId: 1, date: 1 }, { unique: true });

// Index for activity analysis
userActivitySchema.index({ activityScore: 1 });
userActivitySchema.index({ featuresUsed: 1 });

export const UserActivity = model<IUserActivity>('UserActivity', userActivitySchema);