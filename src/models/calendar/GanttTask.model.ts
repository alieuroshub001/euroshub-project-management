// src/models/calendar/GanttTask.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IGanttTask extends Document {
  name: string;
  start: Date;
  end: Date;
  progress: number;
  dependencies: Schema.Types.ObjectId[];
  projectId: Schema.Types.ObjectId;
  assigneeId?: Schema.Types.ObjectId;
  type: 'task' | 'milestone';
  baselineStart?: Date;
  baselineEnd?: Date;
  criticalPath: boolean;
  customFields?: {
    fieldName: string;
    value: any;
    type: 'string' | 'number' | 'date' | 'boolean';
  }[];
}

const ganttTaskSchema = new Schema<IGanttTask>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200 
    },
    start: { 
      type: Date, 
      required: true,
      index: true 
    },
    end: { 
      type: Date, 
      required: true,
      index: true 
    },
    progress: { 
      type: Number, 
      min: 0, 
      max: 100,
      default: 0 
    },
    dependencies: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'GanttTask' 
    }],
    projectId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true,
      index: true 
    },
    assigneeId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      index: true 
    },
    type: {
      type: String,
      enum: ['task', 'milestone'],
      default: 'task'
    },
    baselineStart: { type: Date },
    baselineEnd: { type: Date },
    criticalPath: { 
      type: Boolean, 
      default: false 
    },
    customFields: [{
      fieldName: { type: String, required: true },
      value: { type: Schema.Types.Mixed },
      type: {
        type: String,
        enum: ['string', 'number', 'date', 'boolean'],
        required: true
      }
    }]
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
ganttTaskSchema.index({ projectId: 1, start: 1 });
ganttTaskSchema.index({ assigneeId: 1 });
ganttTaskSchema.index({ type: 1 });
ganttTaskSchema.index({ criticalPath: 1 });

// Virtual for duration in days
ganttTaskSchema.virtual('durationDays').get(function() {
  return (this.end.getTime() - this.start.getTime()) / (1000 * 60 * 60 * 24);
});

// Virtual for baseline variance
ganttTaskSchema.virtual('startVarianceDays').get(function() {
  if (!this.baselineStart) return 0;
  return (this.start.getTime() - this.baselineStart.getTime()) / (1000 * 60 * 60 * 24);
});

export const GanttTask = model<IGanttTask>('GanttTask', ganttTaskSchema);