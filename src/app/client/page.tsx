// app/client/page.tsx
import { ClientDashboard } from '@/components/Client/Dashboard'
import { Sidebar } from '@/components/Client/Sidebar'
import { TopNav } from '@/components/Client/TopNav'

const clientStats = {
  active_projects: 2,
  completed_projects: 1,
  pending_tasks: 5,
  overdue_tasks: 1,
  unread_messages: 3,
  unpaid_invoices: 2,
  total_spent: 12500
}

export default function ClientDashboardPage() {

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav/>
        <main className="flex-1 overflow-auto bg-gray-50">
          <ClientDashboard stats={clientStats} />
        </main>
      </div>
    </div>
  )
}