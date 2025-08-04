import { AuthCard } from '@/components/auth/AuthCard'
import { SignupForm } from '@/components/auth/Signup'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard
        title="Create an account"
        description="Enter your email to get started"
        linkText="Already have an account? Sign In"
        linkHref="/login"
      >
        <SignupForm />
      </AuthCard>
    </div>
  )
}