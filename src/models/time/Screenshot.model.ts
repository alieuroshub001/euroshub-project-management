// src/models/time/Screenshot.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IScreenshot extends Document {
  timeLogId: Schema.Types.ObjectId;
  url: string;
  thumbnailUrl: string;
  timestamp: Date;
  blurred?: boolean;
  activityPercentage?: number;
}

const screenshotSchema = new Schema<IScreenshot>(
  {
    timeLogId: { 
      type: Schema.Types.ObjectId, 
      ref: 'TimeLog', 
      required: true 
    },
    url: { 
      type: String, 
      required: true 
    },
    thumbnailUrl: { 
      type: String, 
      required: true 
    },
    timestamp: { 
      type: Date, 
      required: true,
      index: true 
    },
    blurred: { 
      type: Boolean, 
      default: false 
    },
    activityPercentage: { 
      type: Number, 
      min: 0, 
      max: 100 
    }
  },
  { timestamps: true }
);

// Indexes
screenshotSchema.index({ timeLogId: 1 });
screenshotSchema.index({ timestamp: 1 });

export const Screenshot = model<IScreenshot>('Screenshot', screenshotSchema);