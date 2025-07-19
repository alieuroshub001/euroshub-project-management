// src/models/Settings/Organization.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  logo?: string;
  domain?: string;
  features: {
    projects: boolean;
    timeTracking: boolean;
    hrModule: boolean;
    reports: boolean;
    chat: boolean;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    customLogo: boolean;
    customFavicon: boolean;
  };
  createdBy: Schema.Types.ObjectId;
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100 
    },
    logo: { type: String },
    domain: { 
      type: String,
      trim: true,
      lowercase: true
    },
    features: {
      projects: { type: Boolean, default: true },
      timeTracking: { type: Boolean, default: true },
      hrModule: { type: Boolean, default: false },
      reports: { type: Boolean, default: true },
      chat: { type: Boolean, default: true }
    },
    branding: {
      primaryColor: { 
        type: String, 
        default: '#3b82f6',
        match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ 
      },
      secondaryColor: { 
        type: String, 
        default: '#10b981',
        match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ 
      },
      customLogo: { type: Boolean, default: false },
      customFavicon: { type: Boolean, default: false }
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Indexes
OrganizationSchema.index({ name: 'text' });
OrganizationSchema.index({ domain: 1 }, { unique: true, sparse: true });

export const Organization = model<IOrganization>('Organization', OrganizationSchema);