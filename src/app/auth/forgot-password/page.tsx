import { AuthCard } from '@/components/auth/AuthCard'
import { ForgotPasswordForm } from '@/components/auth/Forget-Password'

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard
        title="Forgot Password"
        description="Enter your email to receive a reset link"
        linkText="Back to Sign In"
        linkHref="/login"
      >
        <ForgotPasswordForm />
      </AuthCard>
    </div>
  )
}