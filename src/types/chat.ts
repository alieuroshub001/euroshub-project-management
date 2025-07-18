//types/chat.ts

export interface Channel {
  _id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  memberIds: string[];
  projectId?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  channelId: string;
  senderId: string;
  content: string;
  parentId?: string; // for threads
  isThread?: boolean;
  attachments?: Attachment[];
  mentions?: string[]; // user IDs
  reactions?: Reaction[];
  edited?: boolean;
  deleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  type: 'image' | 'video' | 'document' | 'audio' | 'other';
  url: string;
  name?: string;
  size?: number;
  thumbnailUrl?: string;
}

export interface Reaction {
  emoji: string;
  userIds: string[];
}

export interface Notification {
  _id: string;
  userId: string;
  type: 'mention' | 'message' | 'approval' | 'system';
  message: string;
  read: boolean;
  link?: string;
  relatedId?: string; // messageId, taskId, etc
  createdAt: Date;
}