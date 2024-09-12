import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = createClient()
  const cookieStore = cookies()

  // Get session from Supabase
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession()
  console.log('in route')
  if (sessionError) {
    console.error('Error fetching user session:', sessionError)
    return NextResponse.json(
      { error: 'Failed to fetch user session' },
      { status: 500 }
    )
  }

  const user_id = session?.user?.id // Get user_id from the session

  if (!user_id) {
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 }
    )
  }

  // Fetch projects from Supabase
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user_id)

  if (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }

  return NextResponse.json({ projects: data })
}
