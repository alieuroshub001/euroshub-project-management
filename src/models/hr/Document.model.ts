// src/models/hr/Document.model.ts

import { Schema, model, Document as MongooseDocument } from 'mongoose';

export interface IDocument extends MongooseDocument {
  userId: Schema.Types.ObjectId;
  type: string;
  name: string;
  url: string;
  expiryDate?: Date;
  status: 'valid' | 'expired' | 'expiring-soon';
  confidential: boolean;
  uploadedBy: Schema.Types.ObjectId;
}

const documentSchema = new Schema<IDocument>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    type: { 
      type: String, 
      required: true,
      trim: true 
    },
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    url: { 
      type: String, 
      required: true 
    },
    expiryDate: { type: Date },
    status: {
      type: String,
      enum: ['valid', 'expired', 'expiring-soon'],
      default: 'valid'
    },
    confidential: { 
      type: Boolean, 
      default: false 
    },
    uploadedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { timestamps: true }
);

// Indexes
documentSchema.index({ userId: 1 });
documentSchema.index({ type: 1 });
documentSchema.index({ status: 1 });
documentSchema.index({ expiryDate: 1 });

// Middleware to update status based on expiry
documentSchema.pre<IDocument>('save', function(next) {
  if (this.expiryDate) {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.setDate(now.getDate() + 30));
    
    if (this.expiryDate < new Date()) {
      this.status = 'expired';
    } else if (this.expiryDate < thirtyDaysFromNow) {
      this.status = 'expiring-soon';
    } else {
      this.status = 'valid';
    }
  }
  next();
});

export const DocumentModel = model<IDocument>('Document', documentSchema);