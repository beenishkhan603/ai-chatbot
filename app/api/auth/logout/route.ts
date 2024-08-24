import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { signOut as nextAuthSignOut } from 'next-auth/react'

export async function POST() {
  const supabase = createClient()

  // Sign out from Supabase
  await supabase.auth.signOut()

  // Sign out from NextAuth (if applicable)
  // You may need to adjust this based on your specific NextAuth setup
  await nextAuthSignOut({ redirect: false })

  // Clear cookies if necessary (e.g., Supabase cookies)
  const response = NextResponse.json({ message: 'Logged out successfully' })
  response.cookies.set('sb:token', '', { maxAge: -1 }) // Clear Supabase cookie
  response.cookies.set('next-auth.session-token', '', { maxAge: -1 }) // Clear NextAuth cookie

  return response
}
