//types/file.ts

export interface File {
  _id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  parentType: 'project' | 'task' | 'message' | 'user' | 'document';
  parentId: string;
  thumbnailUrl?: string;
  metadata?: any;
  createdAt: Date;
}

export interface FilePreview {
  url: string;
  type: 'image' | 'pdf' | 'video' | 'audio' | 'document' | 'other';
  name: string;
  size: string;
  pages?: number; // for PDFs
  duration?: number; // for audio/video
  dimensions?: {
    width: number;
    height: number;
  };
}