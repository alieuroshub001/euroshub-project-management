// app/hr/page.tsx
import { HRDashboard } from '@/components/HR/Dashboard'
import { Sidebar } from '@/components/HR/Sidebar'
import { TopNav } from '@/components/HR/TopNav'

const hrStats = {
  total_employees: 87,
  present_today: 76,
  on_leave: 11,
  pending_leave_requests: 5,
  new_joiners_this_month: 4,
  documents_pending_review: 3,
  average_working_hours: 8.2,
  attendance_rate: 92.5
}

export default function HRDashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-auto">
          <HRDashboard stats={hrStats} />
        </main>
      </div>
    </div>
  )
}