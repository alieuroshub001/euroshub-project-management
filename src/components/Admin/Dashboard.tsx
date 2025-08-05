// components/Admin/Dashboard.tsx
import React from 'react'
import { Card } from './Card'

interface DashboardStats {
  total_users: number
  active_projects: number
  completed_tasks: number
  pending_tasks: number
  total_time_logged?: number
  active_employees?: number
}

interface RecentActivity {
  id: string
  type: 'task' | 'project' | 'user' | 'leave'
  title: string
  description: string
  timestamp: string
  user?: string
  status?: string
}

interface DashboardProps {
  stats: DashboardStats
  recentActivities?: RecentActivity[]
}

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'task',
    title: 'Task Completed',
    description: 'John completed "Design Login Page"',
    timestamp: '2 hours ago',
    user: 'John Doe',
    status: 'completed'
  },
  {
    id: '2',
    type: 'project',
    title: 'New Project Created',
    description: 'Sarah created "Mobile App Redesign"',
    timestamp: '4 hours ago',
    user: 'Sarah Wilson',
    status: 'active'
  },
  {
    id: '3',
    type: 'leave',
    title: 'Leave Request',
    description: 'Mike requested 3 days sick leave',
    timestamp: '1 day ago',
    user: 'Mike Johnson',
    status: 'pending'
  },
  {
    id: '4',
    type: 'user',
    title: 'New Employee',
    description: 'Emma joined as Frontend Developer',
    timestamp: '2 days ago',
    user: 'Emma Davis',
    status: 'active'
  }
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'task': return '✅'
    case 'project': return '📂'
    case 'user': return '👤'
    case 'leave': return '📅'
    default: return '📋'
  }
}

const getStatusBadge = (status: string) => {
  const styles = {
    completed: 'bg-green-100 text-green-800',
    active: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800'
  }
  
  return `px-2 py-1 text-xs rounded-full font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`
}

export const Dashboard = ({ stats, recentActivities = mockActivities }: DashboardProps) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your team today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          title="Total Users" 
          value={stats.total_users || 0} 
          icon="👥" 
          trend="up"
          trendValue="12% from last month"
        />
        <Card 
          title="Active Projects" 
          value={stats.active_projects || 0} 
          icon="📂" 
          trend="up"
          trendValue="8% from last month"
        />
        <Card 
          title="Completed Tasks" 
          value={stats.completed_tasks || 0} 
          icon="✅" 
          trend="up"
          trendValue="15% from last week"
        />
        <Card 
          title="Pending Tasks" 
          value={stats.pending_tasks || 0} 
          icon="⏳" 
          trend="down"
          trendValue="5% from last week"
        />
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card 
          title="Time Logged Today" 
          value={`${stats.total_time_logged || 0}h`} 
          icon="⏰" 
          trend="neutral"
        />
        <Card 
          title="Active Employees" 
          value={stats.active_employees || 0} 
          icon="🟢" 
          trend="up"
          trendValue="2 more than yesterday"
        />
        <Card 
          title="Completion Rate" 
          value="87%" 
          icon="📊" 
          trend="up"
          trendValue="3% improvement"
        />
      </div>
      
      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-600 mt-1">Latest updates from your team</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    {activity.status && (
                      <span className={`inline-block mt-2 ${getStatusBadge(activity.status)}`}>
                        {activity.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all activities →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-600 mt-1">Common tasks and shortcuts</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="text-2xl mb-2">➕</div>
                <div className="text-sm font-medium text-gray-900">New Project</div>
                <div className="text-xs text-gray-600">Create a new project</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-sm font-medium text-gray-900">Add User</div>
                <div className="text-xs text-gray-600">Invite team member</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-gray-900">View Reports</div>
                <div className="text-xs text-gray-600">Analytics & insights</div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="text-sm font-medium text-gray-900">Settings</div>
                <div className="text-xs text-gray-600">Configure system</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}