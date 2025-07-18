//types/reports.ts

export interface ActivityLog {
  _id: string;
  userId: string;
  action: string;
  entityType?: 'project' | 'task' | 'user' | 'timeLog';
  entityId?: string;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface KPIReport {
  _id: string;
  periodStart: Date;
  periodEnd: Date;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalHours: number;
  tasksCompleted: number;
  tasksOverdue: number;
  teamProductivity: number;
  generatedAt: Date;
}

export interface UserActivityReport {
  userId: string;
  name: string;
  email: string;
  hoursLogged: number;
  tasksCompleted: number;
  tasksOverdue: number;
  activityScore: number;
  lastActive: Date;
}

export interface ProjectProgressReport {
  projectId: string;
  title: string;
  completionPercentage: number;
  tasks: {
    total: number;
    completed: number;
    overdue: number;
  };
  hours: {
    estimated: number;
    actual: number;
  };
  teamMembers: number;
}