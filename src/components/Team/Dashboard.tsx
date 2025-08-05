
import React from 'react'
import { TeamCard } from './Card'

interface TeamDashboardStats {
  assigned_tasks: number
  completed_tasks: number
  pending_review: number
  overdue_tasks: number
  hours_logged: number
  productivity_score: number
  upcoming_deadlines: number
}

interface Task {
  id: string
  title: string
  project: string
  due_date: string
  status: 'not_started' | 'in_progress' | 'pending_review' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
}

interface RecentActivity {
  id: string
  type: 'task' | 'project' | 'comment' | 'approval'
  title: string
  description: string
  timestamp: string
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Fix Login Bug',
    project: 'Website Redesign',
    due_date: '2024-08-15',
    status: 'in_progress',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Update Dashboard UI',
    project: 'Admin Portal',
    due_date: '2024-08-18',
    status: 'pending_review',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'API Integration',
    project: 'Mobile App',
    due_date: '2024-08-10',
    status: 'overdue',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Write Documentation',
    project: 'Website Redesign',
    due_date: '2024-08-20',
    status: 'not_started',
    priority: 'low'
  }
]

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'task',
    title: 'Task Completed',
    description: 'You marked "Update Dashboard" as completed',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    description: 'John commented on "Fix Login Bug"',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    type: 'approval',
    title: 'Approval Received',
    description: 'Your PR for "API Integration" was approved',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    type: 'project',
    title: 'Project Update',
    description: 'New requirements added to "Mobile App"',
    timestamp: '2 days ago'
  }
]

const getStatusColor = (status: string) => {
  const colors = {
    not_started: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    pending_review: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getPriorityColor = (priority: string) => {
  const colors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }
  return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'task': return '✅'
    case 'project': return '📂'
    case 'comment': return '💬'
    case 'approval': return '👍'
    default: return '📋'
  }
}

export const TeamDashboard = ({ stats }: { stats: TeamDashboardStats }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your work overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TeamCard 
          title="Assigned Tasks" 
          value={stats.assigned_tasks || 0} 
          icon="📋" 
          color="blue"
          trend="up"
          trendValue="+2 this week"
        />
        <TeamCard 
          title="Completed" 
          value={stats.completed_tasks || 0} 
          icon="✅" 
          color="green"
          trend="up"
          trendValue="15% increase"
        />
        <TeamCard 
          title="Pending Review" 
          value={stats.pending_review || 0} 
          icon="🔄" 
          color="yellow"
          trend="neutral"
        />
        <TeamCard 
          title="Overdue" 
          value={stats.overdue_tasks || 0} 
          icon="⚠️" 
          color="red"
          trend="down"
          trendValue="1 resolved"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <TeamCard 
          title="Hours Logged" 
          value={`${stats.hours_logged || 0}h`} 
          icon="⏱️" 
          color="purple"
          trend="up"
          trendValue="5h this week"
        />
        <TeamCard 
          title="Productivity" 
          value={`${stats.productivity_score || 0}%`} 
          icon="📊" 
          color="indigo"
          trend="up"
          trendValue="3% improvement"
        />
        <TeamCard 
          title="Upcoming Deadlines" 
          value={stats.upcoming_deadlines || 0} 
          icon="📅" 
          color="blue"
          trend="neutral"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
            <p className="text-sm text-gray-600 mt-1">Your current assignments</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockTasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Project: {task.project}</p>
                    <p className="text-xs text-gray-500">Due: {task.due_date}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all tasks →
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-600 mt-1">Updates from your team</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
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
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-600 mt-1">Common tasks and shortcuts</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group">
  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">➕</div>
  <div className="text-sm font-medium text-gray-900">Create Task</div>
  <div className="text-xs text-gray-500">Add a new task</div>
</button>

<button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group">
  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📝</div>
  <div className="text-sm font-medium text-gray-900">Log Time</div>
  <div className="text-xs text-gray-500">Record hours worked</div>
</button>

<button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group">
  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
  <div className="text-sm font-medium text-gray-900">Generate Report</div>
  <div className="text-xs text-gray-500">Create progress report</div>
</button>

<button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group">
  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👥</div>
  <div className="text-sm font-medium text-gray-900">Team Chat</div>
  <div className="text-xs text-gray-500">Message your team</div>
</button>
</div>
</div>
</div>
</div>
)
}   