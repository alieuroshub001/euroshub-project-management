// types/task.ts

import { Priority, Status } from './common';

export interface Task {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId?: string;
  reporterId: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done' | Status;
  priority: Priority;
  dueDate?: Date;
  labels?: string[];
  checklist?: ChecklistItem[];
  estimatedHours?: number;
  actualHours?: number;
  dependencies?: string[];
  attachments?: string[];
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  deletedAt?: Date;
}

export interface ChecklistItem {
  _id: string;
  label: string;
  completed: boolean;
  completedAt?: Date;
  createdBy: string;
}

export interface TaskComment {
  _id: string;
  taskId: string;
  userId: string;
  content: string;
  mentions?: string[];
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface TaskHistory {
  _id: string;
  taskId: string;
  changedBy: string;
  action: string;
  field?: string;
  oldValue?: any;
  newValue?: any;
  createdAt: Date;
}

export interface TaskFilter {
  status?: string[];
  priority?: Priority[];
  assigneeId?: string;
  reporterId?: string;
  projectId?: string;
  dueDate?: {
    from?: Date;
    to?: Date;
  };
  search?: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  overdue: number;
  byStatus: Record<string, number>;
  byPriority: Record<Priority, number>;
  byAssignee: Record<string, number>;
}