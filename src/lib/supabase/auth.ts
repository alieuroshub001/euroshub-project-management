import { createClient } from '@/lib/supabase/client'
import { TablesInsert } from '@/types/types'

const supabase = createClient()

export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signUpWithEmail = async (email: string) => {
  return await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
}

export const sendPasswordResetEmail = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
}

export const resetPassword = async (newPassword: string) => {
  return await supabase.auth.updateUser({
    password: newPassword,
  })
}

export const verifyOtp = async (email: string, token: string) => {
  return await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })
}

export const createProfile = async (profileData: TablesInsert<'profiles'>) => {
  return await supabase.from('profiles').insert(profileData)
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}