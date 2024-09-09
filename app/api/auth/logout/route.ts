import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST() {
  const supabase = createClient()

  // Sign out from Supabase
  await supabase.auth.signOut()

  // Clear Supabase cookies
  const response = NextResponse.json({ message: 'Logged out successfully' })
  response.cookies.set('sb:token', '', { maxAge: -1 }) // Clear Supabase cookie
  response.cookies.set('next-auth.session-token', '', { maxAge: -1 })

  return response
}
