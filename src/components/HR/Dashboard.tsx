// components/HR/Dashboard.tsx
import React from 'react'
import { HRCard } from './Card'

interface HRDashboardStats {
  total_employees: number
  present_today: number
  on_leave: number
  pending_leave_requests: number
  new_joiners_this_month: number
  documents_pending_review: number
  average_working_hours: number
  attendance_rate: number
}

interface LeaveRequest {
  id: string
  employee_name: string
  leave_type: 'casual' | 'sick' | 'annual' | 'maternity' | 'emergency'
  start_date: string
  end_date: string
  days: number
  status: 'pending' | 'approved' | 'rejected'
  reason: string
}

interface AttendanceSummary {
  employee_name: string
  check_in: string
  check_out?: string
  status: 'present' | 'late' | 'absent' | 'half_day'
  total_hours?: number
}

interface HRDashboardProps {
  stats: HRDashboardStats
  recentLeaveRequests?: LeaveRequest[]
  todayAttendance?: AttendanceSummary[]
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employee_name: 'John Doe',
    leave_type: 'sick',
    start_date: '2024-08-10',
    end_date: '2024-08-12',
    days: 3,
    status: 'pending',
    reason: 'Fever and flu symptoms'
  },
  {
    id: '2',
    employee_name: 'Sarah Wilson',
    leave_type: 'annual',
    start_date: '2024-08-15',
    end_date: '2024-08-20',
    days: 5,
    status: 'pending',
    reason: 'Family vacation'
  },
  {
    id: '3',
    employee_name: 'Mike Johnson',
    leave_type: 'casual',
    start_date: '2024-08-08',
    end_date: '2024-08-08',
    days: 1,
    status: 'approved',
    reason: 'Personal work'
  }
]

const mockTodayAttendance: AttendanceSummary[] = [
  {
    employee_name: 'Alice Brown',
    check_in: '09:00 AM',
    check_out: '06:00 PM',
    status: 'present',
    total_hours: 9
  },
  {
    employee_name: 'Bob Smith',
    check_in: '09:15 AM',
    status: 'late',
    total_hours: 7.75
  },
  {
    employee_name: 'Carol Davis',
    check_in: '08:45 AM',
    check_out: '05:30 PM',
    status: 'present',
    total_hours: 8.75
  },
  {
    employee_name: 'David Wilson',
    check_in: '',
    status: 'absent'
  }
]

const getLeaveTypeColor = (type: string) => {
  const colors = {
    sick: 'bg-red-100 text-red-800',
    annual: 'bg-blue-100 text-blue-800',
    casual: 'bg-green-100 text-green-800',
    maternity: 'bg-purple-100 text-purple-800',
    emergency: 'bg-orange-100 text-orange-800'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    present: 'bg-green-100 text-green-800',
    late: 'bg-yellow-100 text-yellow-800',
    absent: 'bg-red-100 text-red-800',
    half_day: 'bg-blue-100 text-blue-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

export const HRDashboard = ({ 
  stats, 
  recentLeaveRequests = mockLeaveRequests,
  todayAttendance = mockTodayAttendance 
}: HRDashboardProps) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Dashboard</h1>
        <p className="text-gray-600">Manage your workforce efficiently with real-time insights</p>
      </div>
      
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <HRCard 
          title="Total Employees" 
          value={stats.total_employees || 0} 
          icon="👥" 
          color="blue"
          trend="up"
          trendValue="+5 this month"
        />
        <HRCard 
          title="Present Today" 
          value={stats.present_today || 0} 
          icon="✅" 
          color="green"
          trend="up"
          trendValue="95% attendance"
        />
        <HRCard 
          title="On Leave" 
          value={stats.on_leave || 0} 
          icon="📅" 
          color="yellow"
          trend="neutral"
        />
        <HRCard 
          title="Pending Requests" 
          value={stats.pending_leave_requests || 0} 
          icon="⏳" 
          color="red"
          trend="down"
          trendValue="-2 from yesterday"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <HRCard 
          title="New Joiners" 
          value={stats.new_joiners_this_month || 0} 
          icon="🆕" 
          color="purple"
          trend="up"
          trendValue="This month"
        />
        <HRCard 
          title="Docs Pending" 
          value={stats.documents_pending_review || 0} 
          icon="📄" 
          color="indigo"
          trend="neutral"
        />
        <HRCard 
          title="Avg. Working Hours" 
          value={`${stats.average_working_hours || 0}h`} 
          icon="⏰" 
          color="blue"
          trend="up"
          trendValue="0.5h increase"
        />
        <HRCard 
          title="Attendance Rate" 
          value={`${stats.attendance_rate || 0}%`} 
          icon="📊" 
          color="green"
          trend="up"
          trendValue="2% improvement"
        />
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pending Leave Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Pending Leave Requests</h2>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full">
                {recentLeaveRequests.filter(req => req.status === 'pending').length} pending
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Requests awaiting approval</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentLeaveRequests.slice(0, 5).map((request) => (
                <div key={request.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{request.employee_name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getLeaveTypeColor(request.leave_type)}`}>
                        {request.leave_type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{request.reason}</p>
                    <p className="text-xs text-gray-500">
                      {request.start_date} to {request.end_date} ({request.days} days)
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    {request.status === 'pending' && (
                      <div className="flex space-x-1">
                        <button className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                          ✓
                        </button>
                        <button className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                          ✗
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all leave requests →
              </button>
            </div>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Today's Attendance</h2>
            <p className="text-sm text-gray-600 mt-1">Real-time attendance tracking</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {todayAttendance.slice(0, 6).map((attendance, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-800">
                        {attendance.employee_name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{attendance.employee_name}</p>
                      <p className="text-sm text-gray-600">
                        {attendance.check_in || 'Not checked in'} 
                        {attendance.check_out && ` - ${attendance.check_out}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(attendance.status)}`}>
                      {attendance.status}
                    </span>
                    {attendance.total_hours && (
                      <p className="text-xs text-gray-500 mt-1">{attendance.total_hours}h</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View full attendance report →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-600 mt-1">Common HR tasks and shortcuts</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👤</div>
              <div className="text-sm font-medium text-gray-900">Add Employee</div>
              <div className="text-xs text-gray-600">Onboard new team member</div>
            </button>
            
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">✅</div>
              <div className="text-sm font-medium text-gray-900">Mark Attendance</div>
              <div className="text-xs text-gray-600">Manual attendance entry</div>
            </button>
            
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <div className="text-sm font-medium text-gray-900">Generate Report</div>
              <div className="text-xs text-gray-600">HR analytics & reports</div>
            </button>
            
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors text-left group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📄</div>
              <div className="text-sm font-medium text-gray-900">Review Documents</div>
              <div className="text-xs text-gray-600">Pending document approvals</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}