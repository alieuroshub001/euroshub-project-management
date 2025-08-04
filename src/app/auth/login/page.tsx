import { AuthCard } from '@/components/auth/AuthCard'
import { LoginForm } from '@/components/auth/Login'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard
        title="Welcome back"
        description="Enter your email and password to sign in"
        linkText="Don't have an account? Sign Up"
        linkHref="/signup"
      >
        <LoginForm />
      </AuthCard>
    </div>
  )
}