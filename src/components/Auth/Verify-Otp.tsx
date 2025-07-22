// src/components/Auth/Verify-Otp.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface VerifyOtpProps {
  email: string;
  type?: 'verification' | 'reset';
}

export default function VerifyOtp({ email, type = 'verification' }: VerifyOtpProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  
  const router = useRouter();

 

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Email verified successfully!');
        setTimeout(() => {
          if (type === 'verification') {
            router.push('/auth/login?message=verified');
          } else {
            router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&verified=true`);
          }
        }, 1500);
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setResendLoading(true);
    setError('');

    try {
      const endpoint = type === 'verification' ? '/api/auth/resend-verification' : '/api/auth/forgot-password';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('New OTP sent to your email');
        setCanResend(false);
        setCountdown(30);
        setOtp(['', '', '', '', '', '']);
      } else {
        setError(data.error || data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {type === 'verification' ? 'Verify Your Email' : 'Verify Reset Code'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 6-digit code to{' '}
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
              {success}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter verification code
            </label>
            <div className="flex space-x-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </div>

          <div className="text-center space-y-3">
            <div>
              {!canResend ? (
                <p className="text-sm text-gray-600">
                  Resend code in {countdown} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400"
                >
                  {resendLoading ? 'Sending...' : 'Resend Code'}
                </button>
              )}
            </div>

            <div>
              <Link 
                href="/auth/login"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </form>

        {email && (
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Wrong email? You can{' '}
              <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500">
                sign up again
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}