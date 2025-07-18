// types/project.ts

import { Visibility, Status } from './common';

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: Status;
  visibility: Visibility;
  ownerId: string;
  teamIds: string[];
  tags?: string[];
  startDate?: Date;
  endDate?: Date;
  archivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  coverImage?: string;
  color?: string;
}

export interface ProjectMember {
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: Date;
}

export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  teamMembers: number;
  totalHours: number;
  completionPercentage: number;
}

export interface ProjectInvitation {
  _id: string;
  projectId: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  token: string;
  expiresAt: Date;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: Date;
}

export interface ProjectUpdate {
  _id: string;
  projectId: string;
  authorId: string;
  title: string;
  content: string;
  attachments?: string[];
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectFilter {
  status?: Status[];
  visibility?: Visibility[];
  teamMember?: string;
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  search?: string;
}