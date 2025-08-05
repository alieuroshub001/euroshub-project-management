// app/team/page.tsx
import { TeamDashboard } from '@/components/Team/Dashboard'
import { Sidebar } from '@/components/Team/Sidebar'
import { TopNav } from '@/components/Team/TopNav'

const teamStats = {
  assigned_tasks: 12,
  completed_tasks: 8,
  pending_review: 3,
  overdue_tasks: 1,
  hours_logged: 42.5,
  productivity_score: 87,
  upcoming_deadlines: 5
}

export default function TeamDashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-auto">
          <TeamDashboard stats={teamStats} />
        </main>
      </div>
    </div>
  )
}