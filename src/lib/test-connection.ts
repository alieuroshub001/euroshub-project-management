// lib/test-connection.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...')
    console.log('URL:', supabaseUrl)
    console.log('Key:', supabaseKey ? '✅ Present' : '❌ Missing')
    
    // Test 1: Basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('❌ Connection failed:', error.message)
      return false
    }
    
    console.log('✅ Connection successful!')
    console.log('📊 Profiles table count:', data)
    return true
    
  } catch (err) {
    console.error('❌ Test failed:', err)
    return false
  }
}

// Test authentication
export async function testAuth() {
  try {
    console.log('🔐 Testing authentication...')
    
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Session:', session ? '✅ Active' : '❌ None')
    
    const { data: { user } } = await supabase.auth.getUser()
    console.log('User:', user ? '✅ Authenticated' : '❌ Not authenticated')
    
    return true
  } catch (err) {
    console.error('❌ Auth test failed:', err)
    return false
  }
}