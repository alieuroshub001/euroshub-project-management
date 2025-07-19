// src/models/time/Activity.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: Schema.Types.ObjectId;
  type: 'keyboard' | 'mouse' | 'app' | 'website';
  value: string;
  timestamp: Date;
  duration?: number;
  timeLogId?: Schema.Types.ObjectId;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    type: {
      type: String,
      enum: ['keyboard', 'mouse', 'app', 'website'],
      required: true
    },
    value: { 
      type: String, 
      required: true,
      trim: true 
    },
    timestamp: { 
      type: Date, 
      required: true,
      index: true 
    },
    duration: { 
      type: Number, 
      min: 0 
    },
    timeLogId: { 
      type: Schema.Types.ObjectId, 
      ref: 'TimeLog' 
    }
  },
  { timestamps: true }
);

// Indexes
activitySchema.index({ userId: 1 });
activitySchema.index({ type: 1 });
activitySchema.index({ timeLogId: 1 });
activitySchema.index({ timestamp: 1, type: 1 });

export const Activity = model<IActivity>('Activity', activitySchema);