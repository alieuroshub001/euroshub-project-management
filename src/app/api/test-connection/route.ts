// app/api/test-connection/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Test connection function
async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...')
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('❌ Connection failed:', error.message)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Connection successful!')
    return { success: true, message: 'Database connection working!' }
    
  } catch (err) {
    console.error('❌ Test failed:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

// Test authentication
async function testAuth() {
  try {
    console.log('🔐 Testing authentication setup...')
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // This should work without authentication (just checking if auth is set up)
    const { data: { session } } = await supabase.auth.getSession()
    
    return { success: true, hasSession: !!session }
  } catch (err) {
    console.error('❌ Auth test failed:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Auth test failed' }
  }
}

// GET method - this is what App Router expects
export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Running connection tests...')
    
    // Test environment variables
    const envCheck = {
      supabaseUrl: supabaseUrl ? '✅ Set' : '❌ Missing',
      anonKey: supabaseAnonKey ? '✅ Set' : '❌ Missing',
      serviceKey: supabaseServiceKey ? '✅ Set' : '❌ Missing',
      databaseUrl: process.env.DATABASE_URL ? '✅ Set' : '❌ Missing'
    }
    
    // Run tests
    const connectionTest = await testConnection()
    const authTest = await testAuth()
    
    // Check if any required env vars are missing
    const missingVars = Object.entries(envCheck)
      .filter(([key, value]) => value.includes('❌'))
      .map(([key]) => key)
    
    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing environment variables: ${missingVars.join(', ')}`,
        environment: envCheck
      }, { status: 500 })
    }
    
    // Return results
    return NextResponse.json({
      success: true,
      message: '🎉 All tests completed!',
      tests: {
        connection: connectionTest,
        auth: authTest
      },
      environment: envCheck,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Test endpoint failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}

// Optional: Add POST method if you want to test with different parameters
export async function POST(request: NextRequest) {
  return NextResponse.json({
    message: 'Use GET method to test connection'
  }, { status: 405 })
}