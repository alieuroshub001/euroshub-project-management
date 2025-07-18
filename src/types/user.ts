//types/user.ts

import { Role, Status } from './common';

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; 
  role: Role;
  department?: string;
  profilePicture?: string;
  status: Status;
  lastActive?: Date;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, 'password'> {
  timezone?: string;
  phone?: string;
  bio?: string;
  skills?: string[];
}

export interface UserStats {
  completedTasks: number;
  overdueTasks: number;
  hoursLogged: number;
  projectsInvolved: number;
}