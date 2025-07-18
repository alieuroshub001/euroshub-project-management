// types/analytics.ts

export interface PageView {
  _id: string;
  path: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  duration: number;
  createdAt: Date;
}

export interface FeatureUsage {
  _id: string;
  feature: string;
  userId: string;
  count: number;
  lastUsed: Date;
}

export interface PerformanceMetric {
  _id: string;
  route: string;
  duration: number;
  method: string;
  statusCode: number;
  timestamp: Date;
}

export interface SystemHealth {
  cpuUsage: number;
  memoryUsage: number;
  uptime: number;
  databaseStatus: 'healthy' | 'degraded' | 'unavailable';
  timestamp: Date;
}

export interface UserActivity {
  userId: string;
  lastActive: Date;
  sessions: number;
  featuresUsed: string[];
  devices: string[];
}