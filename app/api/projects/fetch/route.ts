import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = createClient()

  // Fetch projects from Supabase
  const { data, error } = await supabase.from('projects').select('*')

  if (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }

  return NextResponse.json({ projects: data })
}
