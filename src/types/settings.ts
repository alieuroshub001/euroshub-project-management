// types/settings.ts

export interface AppSettings {
  timeTracking: {
    screenshotInterval: number; // minutes
    idleThreshold: number; // minutes
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
    sessionTimeout: number; // minutes
  };
}

export interface UserSettings {
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
    };
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    density: 'compact' | 'normal' | 'comfortable';
  };
  timezone: string;
  workingHours: {
    start: string;
    end: string;
    days: number[]; // 0-6 (Sunday-Saturday)
  };
  shortcuts: Record<string, string>;
}

export interface OrganizationSettings {
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
    customLogo?: boolean;
    customFavicon?: boolean;
  };
}