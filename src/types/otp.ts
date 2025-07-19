export interface OTP {
  _id: string;
  email: string;
  phone?: string; // For SMS OTP
  code: string;
  type: 'signup' | 'reset' | '2fa' | 'login';
  channel: 'email' | 'sms';
  expiresAt: Date;
  attempts: number;
  used: boolean;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface OTPConfig {
  length: number;
  expiryMinutes: number;
  maxAttempts: number;
  alphabetic: boolean;
  numeric: boolean;
  mixedCase: boolean;
  specialChars: boolean;
}