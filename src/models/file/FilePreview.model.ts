// src/models/file/FilePreview.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IFilePreview extends Document {
  fileId: Schema.Types.ObjectId;
  url: string;
  type: 'image' | 'pdf' | 'video' | 'audio' | 'document' | 'other';
  size: string;
  pages?: number;
  duration?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  generatedAt: Date;
}

const filePreviewSchema = new Schema<IFilePreview>(
  {
    fileId: { 
      type: Schema.Types.ObjectId, 
      ref: 'File', 
      required: true,
      unique: true 
    },
    url: { 
      type: String, 
      required: true 
    },
    type: {
      type: String,
      enum: ['image', 'pdf', 'video', 'audio', 'document', 'other'],
      required: true
    },
    size: { 
      type: String, 
      required: true 
    },
    pages: { 
      type: Number, 
      min: 1 
    },
    duration: { 
      type: Number, 
      min: 0 
    },
    dimensions: {
      width: { type: Number },
      height: { type: Number }
    },
    generatedAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  { timestamps: true }
);

// Index for quick lookup
filePreviewSchema.index({ fileId: 1 });

export const FilePreview = model<IFilePreview>('FilePreview', filePreviewSchema);