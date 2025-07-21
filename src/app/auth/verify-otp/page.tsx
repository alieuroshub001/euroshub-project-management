// app/auth/verify-otp/page.tsx
import VerifyOtp from '@/components/Auth/Verify-Otp'
import { notFound } from 'next/navigation'

interface PageProps {
  searchParams: {
    type?: 'verification' | 'reset'
    email?: string
  }
}

export default function VerifyOtpPage({ searchParams }: PageProps) {
  if (!searchParams.email) {
    // Redirect or show error if email is missing
    return notFound()
  }

  return <VerifyOtp type={searchParams.type || 'verification'} />
}