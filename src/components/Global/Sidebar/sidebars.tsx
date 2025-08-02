// components/layout/sidebars.tsx
import { Role } from '@/types/common';
import { IconType } from 'react-icons';
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiClock,
  FiCalendar,
  FiFileText,
  FiMessageSquare,
  FiPieChart,
  FiBriefcase,
  FiLayers,
  FiCheckSquare,
  FiUploadCloud,
  FiInbox
} from 'react-icons/fi';

export interface SidebarItem {
  title: string;
  path?: string;
  icon: IconType;
  roles: Role[];
  subItems?: SidebarItem[];
  badge?: number;
  disabled?: boolean;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: FiHome,
    roles: ['super-admin', 'admin', 'manager', 'team', 'client']
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: FiBriefcase,
    roles: ['super-admin', 'admin', 'manager', 'team'],
    subItems: [
      {
        title: 'All Projects',
        path: '/projects',
        icon: FiLayers,
        roles: ['super-admin', 'admin', 'manager', 'team']
      },
      {
        title: 'Create New',
        path: '/projects/new',
        icon: FiUploadCloud,
        roles: ['super-admin', 'admin', 'manager']
      }
    ]
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: FiCheckSquare,
    roles: ['super-admin', 'admin', 'manager', 'team'],
    subItems: [
      {
        title: 'My Tasks',
        path: '/tasks/me',
        icon: FiInbox,
        roles: ['super-admin', 'admin', 'manager', 'team']
      },
      {
        title: 'Team Tasks',
        path: '/tasks/team',
        icon: FiUsers,
        roles: ['super-admin', 'admin', 'manager']
      }
    ]
  },
  {
    title: 'Time Tracking',
    path: '/time-logs',
    icon: FiClock,
    roles: ['super-admin', 'admin', 'manager', 'team'],
    subItems: [
      {
        title: 'My Time Logs',
        path: '/time-logs',
        icon: FiClock,
        roles: ['super-admin', 'admin', 'manager', 'team']
      },
      {
        title: 'Timesheets',
        path: '/time-logs/timesheets',
        icon: FiFileText,
        roles: ['super-admin', 'admin', 'manager', 'team']
      },
      {
        title: 'Approvals',
        path: '/time-logs/approvals',
        icon: FiCheckSquare,
        roles: ['super-admin', 'admin', 'manager']
      }
    ]
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: FiCalendar,
    roles: ['super-admin', 'admin', 'manager', 'team']
  },
  {
    title: 'HR',
    path: '/hr',
    icon: FiUsers,
    roles: ['super-admin', 'admin'],
    subItems: [
      {
        title: 'Employees',
        path: '/hr/employees',
        icon: FiUsers,
        roles: ['super-admin', 'admin']
      },
      {
        title: 'Leave Requests',
        path: '/hr/leave-requests',
        icon: FiInbox,
        roles: ['super-admin', 'admin']
      },
      {
        title: 'Attendance',
        path: '/hr/attendance',
        icon: FiClock,
        roles: ['super-admin', 'admin']
      }
    ]
  },
  {
    title: 'Communication',
    path: '/communication',
    icon: FiMessageSquare,
    roles: ['super-admin', 'admin', 'manager', 'team'],
    subItems: [
      {
        title: 'Channels',
        path: '/communication/channels',
        icon: FiMessageSquare,
        roles: ['super-admin', 'admin', 'manager', 'team']
      },
      {
        title: 'Direct Messages',
        path: '/communication/messages',
        icon: FiInbox,
        roles: ['super-admin', 'admin', 'manager', 'team']
      }
    ]
  },
  {
    title: 'Reports',
    path: '/analytics',
    icon: FiPieChart,
    roles: ['super-admin', 'admin', 'manager'],
    subItems: [
      {
        title: 'Project Stats',
        path: '/analytics/project-stats',
        icon: FiBriefcase,
        roles: ['super-admin', 'admin', 'manager']
      },
      {
        title: 'User Activity',
        path: '/analytics/user-activity',
        icon: FiUsers,
        roles: ['super-admin', 'admin', 'manager']
      }
    ]
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: FiSettings,
    roles: ['super-admin', 'admin'],
    subItems: [
      {
        title: 'App Settings',
        path: '/settings/app',
        icon: FiSettings,
        roles: ['super-admin']
      },
      {
        title: 'User Settings',
        path: '/settings/user',
        icon: FiUsers,
        roles: ['super-admin', 'admin']
      }
    ]
  }
];