// components/Client/Dashboard.tsx
import React from 'react'
import { ClientCard } from './Card'

interface ClientDashboardStats {
  active_projects: number
  completed_projects: number
  pending_tasks: number
  overdue_tasks: number
  unread_messages: number
  unpaid_invoices: number
  total_spent: number
}

interface Project {
  id: string
  title: string
  status: 'planning' | 'active' | 'on_hold' | 'completed'
  due_date: string
  progress: number
  assigned_team: string
}

interface RecentActivity {
  id: string
  type: 'message' | 'task' | 'invoice' | 'project'
  title: string
  description: string
  timestamp: string
  isUnread?: boolean
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    status: 'active',
    due_date: '2024-09-15',
    progress: 65,
    assigned_team: 'Web Team'
  },
  {
    id: '2',
    title: 'Mobile App Development',
    status: 'active',
    due_date: '2024-10-20',
    progress: 35,
    assigned_team: 'Mobile Team'
  },
  {
    id: '3',
    title: 'Marketing Campaign',
    status: 'completed',
    due_date: '2024-07-30',
    progress: 100,
    assigned_team: 'Marketing Team'
  }
]

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Message',
    description: 'From John about Website Redesign',
    timestamp: '2 hours ago',
    isUnread: true
  },
  {
    id: '2',
    type: 'task',
    title: 'Task Completed',
    description: 'Homepage design approved',
    timestamp: '1 day ago'
  },
  {
    id: '3',
    type: 'invoice',
    title: 'Invoice Sent',
    description: 'Invoice #1234 for $2,500',
    timestamp: '3 days ago'
  },
  {
    id: '4',
    type: 'project',
    title: 'Project Update',
    description: 'Mobile App project phase 1 completed',
    timestamp: '1 week ago'
  }
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'message': return '💬'
    case 'task': return '✅'
    case 'invoice': return '💰'
    case 'project': return '📂'
    default: return '📋'
  }
}

const getStatusColor = (status: string) => {
  const colors = {
    planning: 'bg-gray-100 text-gray-800',
    active: 'bg-blue-100 text-blue-800',
    on_hold: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

export const ClientDashboard = ({ stats }: { stats: ClientDashboardStats }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your project overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ClientCard 
          title="Active Projects" 
          value={stats.active_projects || 0} 
          icon="📂" 
          color="blue"
          trend="up"
          trendValue="+1 this month"
        />
        <ClientCard 
          title="Completed" 
          value={stats.completed_projects || 0} 
          icon="✅" 
          color="green"
          trend="up"
          trendValue="2 this quarter"
        />
        <ClientCard 
          title="Pending Tasks" 
          value={stats.pending_tasks || 0} 
          icon="🔄" 
          color="yellow"
          trend="neutral"
        />
        <ClientCard 
          title="Overdue Tasks" 
          value={stats.overdue_tasks || 0} 
          icon="⚠️" 
          color="red"
          trend="down"
          trendValue="1 resolved"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ClientCard 
          title="Unread Messages" 
          value={stats.unread_messages || 0} 
          icon="💬" 
          color="purple"
          trend="up"
          trendValue="3 new"
        />
        <ClientCard 
          title="Unpaid Invoices" 
          value={stats.unpaid_invoices || 0} 
          icon="💰" 
          color="indigo"
          trend="neutral"
        />
        <ClientCard 
          title="Total Spent" 
          value={`$${stats.total_spent || 0}`} 
          icon="💳" 
          color="blue"
          trend="up"
          trendValue="$500 this month"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Projects</h2>
            <p className="text-sm text-gray-600 mt-1">Your active and completed projects</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockProjects.map((project) => (
                <div key={project.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Team: {project.assigned_team}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-xs text-gray-500">Progress: {project.progress}%</p>
                      <p className="text-xs text-gray-500">Due: {project.due_date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all projects →
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-600 mt-1">Updates from your projects</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                    activity.isUnread ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${
                        activity.isUnread ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {activity.title}
                      </p>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                  {activity.isUnread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
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
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-600 mt-1">Common tasks and shortcuts</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📋</div>
              <div className="text-sm font-medium text-gray-900">New Project</div>
              <div className="text-xs text-gray-500">Request a new project</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💬</div>
              <div className="text-sm font-medium text-gray-900">Send Message</div>
              <div className="text-xs text-gray-500">Contact your team</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💰</div>
              <div className="text-sm font-medium text-gray-900">Make Payment</div>
              <div className="text-xs text-gray-500">Pay an invoice</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <div className="text-sm font-medium text-gray-900">View Reports</div>
              <div className="text-xs text-gray-500">Project analytics</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}