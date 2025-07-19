// src/models/Settings/UserSettings.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IUserSettings extends Document {
  userId: Schema.Types.ObjectId;
  notifications: {
    email: {
      taskAssignment: boolean;
      mention: boolean;
      approval: boolean;
      projectUpdates: boolean;
    };
    inApp: {
      sound: boolean;
      desktop: boolean;
    };
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    density: 'compact' | 'normal' | 'comfortable';
  };
  timezone: string;
  workingHours: {
    start: string;
    end: string;
    days: number[];
  };
  shortcuts: Record<string, string>;
  security: {
    otpEnabled: boolean;
    preferredOtpMethod: 'email' | 'sms';
    backupCodes?: string[];
  };
}

const UserSettingsSchema = new Schema<IUserSettings>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      unique: true 
    },
    notifications: {
      email: {
        taskAssignment: { type: Boolean, default: true },
        mention: { type: Boolean, default: true },
        approval: { type: Boolean, default: true },
        projectUpdates: { type: Boolean, default: false }
      },
      inApp: {
        sound: { type: Boolean, default: true },
        desktop: { type: Boolean, default: true }
      }
    },
    appearance: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system'
      },
      density: {
        type: String,
        enum: ['compact', 'normal', 'comfortable'],
        default: 'normal'
      }
    },
    timezone: { 
      type: String, 
      default: 'UTC' 
    },
    workingHours: {
      start: { 
        type: String, 
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        default: '09:00'
      },
      end: { 
        type: String, 
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        default: '17:00'
      },
      days: {
        type: [Number], // 0-6 (Sunday-Saturday)
        default: [1, 2, 3, 4, 5] // Monday-Friday
      }
    },
    shortcuts: { type: Schema.Types.Mixed, default: {} },
    security: {
      otpEnabled: { type: Boolean, default: false },
      preferredOtpMethod: {
        type: String,
        enum: ['email', 'sms'],
        default: 'email'
      },
      backupCodes: { 
        type: [String], 
        select: false 
      }
    }
  },
  { 
    timestamps: true,
    minimize: false
  }
);

// Index for quick user lookup
UserSettingsSchema.index({ userId: 1 }, { unique: true });

export const UserSettings = model<IUserSettings>('UserSettings', UserSettingsSchema);