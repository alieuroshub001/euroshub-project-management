import { AuthCard } from '@/components/auth/AuthCard'
import { VerifyOtpForm } from '@/components/auth/VerifyOtpForm'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect('/dashboard')
  }

  if (!searchParams.email) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard
        title="Verify OTP"
        description={`Enter the OTP sent to ${searchParams.email}`}
        linkText="Back to Sign In"
        linkHref="/login"
      >
        <VerifyOtpForm email={searchParams.email} />
      </AuthCard>
    </div>
  )
}