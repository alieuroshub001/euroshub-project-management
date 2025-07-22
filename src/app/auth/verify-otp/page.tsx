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
    return notFound()
  }

  return (
    <VerifyOtp 
      email={searchParams.email}
      type={searchParams.type || 'verification'}
    />
  )
}