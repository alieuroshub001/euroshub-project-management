// In your admin layout or page
import { Dashboard } from '@/components/Admin/Dashboard'
import { Sidebar } from '@/components/Admin/Sidebar'
import { TopNav } from '@/components/Admin/TopNav'

const stats = {
  total_users: 156,
  active_projects: 24,
  completed_tasks: 342,
  pending_tasks: 18
}

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-auto">
          <Dashboard stats={stats} />
        </main>
      </div>
    </div>
  )
}