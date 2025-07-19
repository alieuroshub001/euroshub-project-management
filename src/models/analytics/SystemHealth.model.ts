// src/models/analytics/SystemHealth.model.ts

import { Schema, model, Document } from 'mongoose';

export interface ISystemHealth extends Document {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  uptime: number;
  databaseStatus: 'healthy' | 'degraded' | 'unavailable';
  activeConnections: number;
  timestamp: Date;
}

const systemHealthSchema = new Schema<ISystemHealth>(
  {
    cpuUsage: { 
      type: Number, 
      min: 0, 
      max: 100,
      required: true 
    },
    memoryUsage: { 
      type: Number, 
      min: 0, 
      max: 100,
      required: true 
    },
    diskUsage: { 
      type: Number, 
      min: 0, 
      max: 100,
      required: true 
    },
    uptime: { 
      type: Number, 
      min: 0,
      required: true 
    },
    databaseStatus: {
      type: String,
      enum: ['healthy', 'degraded', 'unavailable'],
      required: true
    },
    activeConnections: { 
      type: Number, 
      min: 0,
      required: true 
    },
    timestamp: { 
      type: Date, 
      default: Date.now,
      index: true 
    }
  },
  { timestamps: true }
);

// Index for time-series queries
systemHealthSchema.index({ timestamp: -1 });

// TTL index for automatic data rotation (30 days retention)
systemHealthSchema.index({ timestamp: 1 }, { 
  expireAfterSeconds: 2592000 
});

export const SystemHealth = model<ISystemHealth>('SystemHealth', systemHealthSchema);