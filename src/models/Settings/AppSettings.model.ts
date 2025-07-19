// src/models/Settings/AppSettings.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IAppSettings extends Document {
  timeTracking: {
    screenshotInterval: number;
    idleThreshold: number;
    blurScreenshots: boolean;
    activityMonitoring: boolean;
    screenshotsRequired: boolean;
    autoStart: boolean;
  };
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
      mobile: boolean;
    };
    slack?: {
      webhookUrl?: string;
      channel?: string;
    };
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    density: 'compact' | 'normal' | 'comfortable';
    navigationLayout: 'sidebar' | 'top';
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireSpecialChar: boolean;
      requireNumber: boolean;
      requireUppercase: boolean;
    };
    twoFactor: boolean;
    loginAttempts: number;
    sessionTimeout: number;
    otp: {
      enabled: boolean;
      signupRequiresOtp: boolean;
      resetRequiresOtp: boolean;
      loginRequiresOtp: boolean;
      length: number;
      expiryMinutes: number;
      maxAttempts: number;
      allowSms: boolean;
      allowEmail: boolean;
      codeType: 'numeric' | 'alphanumeric';
    };
  };
  updatedBy: Schema.Types.ObjectId;
}

const AppSettingsSchema = new Schema<IAppSettings>(
  {
    timeTracking: {
      screenshotInterval: { type: Number, min: 1, max: 60, default: 5 }, // minutes
      idleThreshold: { type: Number, min: 1, max: 120, default: 15 }, // minutes
      blurScreenshots: { type: Boolean, default: true },
      activityMonitoring: { type: Boolean, default: true },
      screenshotsRequired: { type: Boolean, default: false },
      autoStart: { type: Boolean, default: false }
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
        desktop: { type: Boolean, default: true },
        mobile: { type: Boolean, default: true }
      },
      slack: {
        webhookUrl: { type: String, trim: true },
        channel: { type: String, trim: true }
      }
    },
    appearance: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'light'
      },
      density: {
        type: String,
        enum: ['compact', 'normal', 'comfortable'],
        default: 'normal'
      },
      navigationLayout: {
        type: String,
        enum: ['sidebar', 'top'],
        default: 'sidebar'
      }
    },
    security: {
      passwordPolicy: {
        minLength: { type: Number, min: 6, max: 64, default: 8 },
        requireSpecialChar: { type: Boolean, default: true },
        requireNumber: { type: Boolean, default: true },
        requireUppercase: { type: Boolean, default: true }
      },
      twoFactor: { type: Boolean, default: false },
      loginAttempts: { type: Number, min: 1, max: 10, default: 5 },
      sessionTimeout: { type: Number, min: 1, max: 1440, default: 30 }, // minutes
      otp: {
        enabled: { type: Boolean, default: false },
        signupRequiresOtp: { type: Boolean, default: false },
        resetRequiresOtp: { type: Boolean, default: true },
        loginRequiresOtp: { type: Boolean, default: false },
        length: { type: Number, min: 4, max: 8, default: 6 },
        expiryMinutes: { type: Number, min: 1, max: 60, default: 5 },
        maxAttempts: { type: Number, min: 1, max: 10, default: 3 },
        allowSms: { type: Boolean, default: false },
        allowEmail: { type: Boolean, default: true },
        codeType: {
          type: String,
          enum: ['numeric', 'alphanumeric'],
          default: 'numeric'
        }
      }
    },
    updatedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { 
    timestamps: true,
    minimize: false // Ensure empty objects are stored
  }
);

// Single document enforcement
AppSettingsSchema.index({ _id: 1 }, { unique: true });

export const AppSettings = model<IAppSettings>('AppSettings', AppSettingsSchema);