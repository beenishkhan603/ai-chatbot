import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = createClient()

  const { user_id } = await req.json()

  // Fetch API keys for the given user_id
  const { data, error } = await supabase
    .from('APIKeys')
    .select('api_key, created_at')
    .eq('user_id', user_id)

  if (error) {
    console.error('Error fetching API keys:', error)
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    )
  }

  return NextResponse.json({ data }, { status: 200 })
}
