// src/models/analytics/KPIReport.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IKPIReport extends Document {
  periodStart: Date;
  periodEnd: Date;
  metrics: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    totalHoursLogged: number;
    tasksCompleted: number;
    tasksOverdue: number;
    teamProductivity: number;
    userActivity: number;
  };
  generatedAt: Date;
}

const KPIReportSchema = new Schema<IKPIReport>(
  {
    periodStart: { 
      type: Date, 
      required: true,
      index: true 
    },
    periodEnd: { 
      type: Date, 
      required: true,
      index: true 
    },
    metrics: {
      totalProjects: { type: Number, min: 0 },
      activeProjects: { type: Number, min: 0 },
      completedProjects: { type: Number, min: 0 },
      totalHoursLogged: { type: Number, min: 0 },
      tasksCompleted: { type: Number, min: 0 },
      tasksOverdue: { type: Number, min: 0 },
      teamProductivity: { type: Number, min: 0, max: 100 },
      userActivity: { type: Number, min: 0, max: 100 }
    },
    generatedAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes for time-based queries
KPIReportSchema.index({ periodStart: 1, periodEnd: 1 }, { unique: true });

// Virtual for period duration in days
KPIReportSchema.virtual('periodDuration').get(function() {
  return (this.periodEnd.getTime() - this.periodStart.getTime()) / (1000 * 60 * 60 * 24);
});

export const KPIReport = model<IKPIReport>('KPIReport', KPIReportSchema);