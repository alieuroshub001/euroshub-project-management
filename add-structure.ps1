# PowerShell script to create EurosHub project management folder structure
# Optimized for Supabase - Only essential API routes included
# Run this script in your existing Next.js project root directory

Write-Host "Creating EurosHub folder structure with minimal API routes..." -ForegroundColor Green

# Create public folder structure
Write-Host "Creating public folders..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "public" -Force
New-Item -ItemType Directory -Path "public/icons" -Force
New-Item -ItemType Directory -Path "public/images" -Force

# Create src folder structure
Write-Host "Creating src folders..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "src" -Force

# Create app folder structure (Next.js App Router)
Write-Host "Creating app structure..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "src/app" -Force
New-Item -ItemType Directory -Path "src/app/(auth)" -Force
New-Item -ItemType Directory -Path "src/app/(auth)/login" -Force
New-Item -ItemType Directory -Path "src/app/(auth)/register" -Force
New-Item -ItemType Directory -Path "src/app/(auth)/forgot-password" -Force
New-Item -ItemType Directory -Path "src/app/(auth)/reset-password" -Force

# Dashboard routes
New-Item -ItemType Directory -Path "src/app/(dashboard)" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/dashboard" -Force

# Projects structure
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/edit" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/kanban" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/calendar" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/gantt" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/tasks" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/tasks/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/tasks/[taskId]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/tasks/[taskId]/edit" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/members" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/projects/[id]/settings" -Force

# HR structure
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/employees" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/employees/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/employees/[id]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/employees/[id]/edit" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/employees/[id]/documents" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/employees/[id]/onboarding" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/attendance" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/attendance/[employeeId]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/leaves" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/leaves/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/leaves/calendar" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/leaves/[id]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/departments" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/departments/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/departments/[id]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/onboarding" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/onboarding/checklists" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/onboarding/checklists/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/hr/onboarding/assignments" -Force

# Communication structure
New-Item -ItemType Directory -Path "src/app/(dashboard)/communication" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/communication/channels" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/communication/channels/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/communication/channels/[id]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/communication/direct-messages" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/communication/direct-messages/[userId]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/communication/notifications" -Force

# Time tracking structure
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking/timer" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking/entries" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking/entries/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking/entries/[id]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking/timesheets" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking/timesheets/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking/timesheets/[id]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking/screenshots" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/time-tracking/activity" -Force

# Reports structure
New-Item -ItemType Directory -Path "src/app/(dashboard)/reports" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/reports/analytics" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/reports/task-completion" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/reports/user-activity" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/reports/time-reports" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/reports/custom" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/reports/custom/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/reports/export" -Force

# Settings structure
New-Item -ItemType Directory -Path "src/app/(dashboard)/settings" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/settings/profile" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/settings/organization" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/settings/teams" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/settings/teams/new" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/settings/teams/[id]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/settings/notifications" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/settings/security" -Force

# Admin structure
New-Item -ItemType Directory -Path "src/app/(dashboard)/admin" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/admin/users" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/admin/users/[id]" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/admin/audit-logs" -Force
New-Item -ItemType Directory -Path "src/app/(dashboard)/admin/system-settings" -Force

# MINIMAL API routes structure - Only essential routes for Supabase
Write-Host "Creating minimal API structure (Supabase optimized)..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "src/app/api" -Force

# Auth routes - Essential for custom auth logic
New-Item -ItemType Directory -Path "src/app/api/auth" -Force
New-Item -ItemType Directory -Path "src/app/api/auth/callback" -Force
New-Item -ItemType Directory -Path "src/app/api/auth/signup" -Force
New-Item -ItemType Directory -Path "src/app/api/auth/signout" -Force
New-Item -ItemType Directory -Path "src/app/api/auth/reset-password" -Force

# File upload - Essential for file handling
New-Item -ItemType Directory -Path "src/app/api/upload" -Force
New-Item -ItemType Directory -Path "src/app/api/upload/avatar" -Force
New-Item -ItemType Directory -Path "src/app/api/upload/documents" -Force
New-Item -ItemType Directory -Path "src/app/api/upload/screenshots" -Force

# Export routes - Essential for report generation
New-Item -ItemType Directory -Path "src/app/api/export" -Force
New-Item -ItemType Directory -Path "src/app/api/export/pdf" -Force
New-Item -ItemType Directory -Path "src/app/api/export/csv" -Force
New-Item -ItemType Directory -Path "src/app/api/export/excel" -Force

# Webhooks - Essential for database triggers
New-Item -ItemType Directory -Path "src/app/api/webhooks" -Force
New-Item -ItemType Directory -Path "src/app/api/webhooks/supabase" -Force

# Email notifications - Essential for automated emails
New-Item -ItemType Directory -Path "src/app/api/notifications" -Force
New-Item -ItemType Directory -Path "src/app/api/notifications/email" -Force

# Cron jobs - Essential for scheduled tasks
New-Item -ItemType Directory -Path "src/app/api/cron" -Force
New-Item -ItemType Directory -Path "src/app/api/cron/daily-reports" -Force
New-Item -ItemType Directory -Path "src/app/api/cron/cleanup" -Force

# Components structure
Write-Host "Creating components structure..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "src/components" -Force
New-Item -ItemType Directory -Path "src/components/ui" -Force
New-Item -ItemType Directory -Path "src/components/layout" -Force
New-Item -ItemType Directory -Path "src/components/auth" -Force
New-Item -ItemType Directory -Path "src/components/projects" -Force
New-Item -ItemType Directory -Path "src/components/projects/kanban" -Force
New-Item -ItemType Directory -Path "src/components/projects/calendar" -Force
New-Item -ItemType Directory -Path "src/components/projects/gantt" -Force
New-Item -ItemType Directory -Path "src/components/projects/tasks" -Force
New-Item -ItemType Directory -Path "src/components/projects/members" -Force
New-Item -ItemType Directory -Path "src/components/hr" -Force
New-Item -ItemType Directory -Path "src/components/hr/employee" -Force
New-Item -ItemType Directory -Path "src/components/hr/attendance" -Force
New-Item -ItemType Directory -Path "src/components/hr/leaves" -Force
New-Item -ItemType Directory -Path "src/components/hr/departments" -Force
New-Item -ItemType Directory -Path "src/components/hr/onboarding" -Force
New-Item -ItemType Directory -Path "src/components/communication" -Force
New-Item -ItemType Directory -Path "src/components/communication/chat" -Force
New-Item -ItemType Directory -Path "src/components/communication/channels" -Force
New-Item -ItemType Directory -Path "src/components/communication/direct-messages" -Force
New-Item -ItemType Directory -Path "src/components/communication/notifications" -Force
New-Item -ItemType Directory -Path "src/components/communication/file-sharing" -Force
New-Item -ItemType Directory -Path "src/components/time-tracking" -Force
New-Item -ItemType Directory -Path "src/components/time-tracking/timer" -Force
New-Item -ItemType Directory -Path "src/components/time-tracking/entries" -Force
New-Item -ItemType Directory -Path "src/components/time-tracking/timesheets" -Force
New-Item -ItemType Directory -Path "src/components/time-tracking/screenshots" -Force
New-Item -ItemType Directory -Path "src/components/time-tracking/monitoring" -Force
New-Item -ItemType Directory -Path "src/components/reports" -Force
New-Item -ItemType Directory -Path "src/components/reports/analytics" -Force
New-Item -ItemType Directory -Path "src/components/reports/tables" -Force
New-Item -ItemType Directory -Path "src/components/reports/export" -Force
New-Item -ItemType Directory -Path "src/components/reports/filters" -Force
New-Item -ItemType Directory -Path "src/components/common" -Force

# Lib structure
Write-Host "Creating lib structure..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "src/lib" -Force
New-Item -ItemType Directory -Path "src/lib/supabase" -Force
New-Item -ItemType Directory -Path "src/lib/auth" -Force
New-Item -ItemType Directory -Path "src/lib/utils" -Force
New-Item -ItemType Directory -Path "src/lib/constants" -Force
New-Item -ItemType Directory -Path "src/lib/validations" -Force
New-Item -ItemType Directory -Path "src/lib/email" -Force

# Hooks, Providers, Store, and Types
Write-Host "Creating remaining src folders..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "src/hooks" -Force
New-Item -ItemType Directory -Path "src/providers" -Force
New-Item -ItemType Directory -Path "src/store" -Force
New-Item -ItemType Directory -Path "src/types" -Force

Write-Host "Folder structure created successfully!" -ForegroundColor Green
Write-Host "Current directory: $((Get-Location).Path)" -ForegroundColor Blue
Write-Host "Optimized for Supabase - Only essential API routes included!" -ForegroundColor Magenta
Write-Host "" -ForegroundColor White
Write-Host "Essential API Routes Created:" -ForegroundColor Yellow
Write-Host "• Authentication (signup, signout, callback)" -ForegroundColor White
Write-Host "• File uploads (avatars, documents, screenshots)" -ForegroundColor White
Write-Host "• Export functionality (PDF, CSV, Excel)" -ForegroundColor White
Write-Host "• Webhooks for database triggers" -ForegroundColor White
Write-Host "• Email notifications" -ForegroundColor White
Write-Host "• Cron jobs for scheduled tasks" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "Use Supabase client directly for all CRUD operations!" -ForegroundColor Green