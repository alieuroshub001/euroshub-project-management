import { AuthCard } from '@/components/auth/AuthCard'
import { ResetPasswordForm } from '@/components/auth/Reset-Password'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ResetPasswordPage() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard
        title="Reset Password"
        description="Enter your new password"
        linkText="Back to Sign In"
        linkHref="/login"
      >
        <ResetPasswordForm />
      </AuthCard>
    </div>
  )
}