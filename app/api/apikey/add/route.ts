import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = createClient()

  const { user_id, api_key } = await req.json()

  // Insert the new API key into the database
  const { data, error } = await supabase
    .from('APIKeys')
    .insert([{ user_id, api_key }])

  if (error) {
    console.error('Error storing API key:', error)
    return NextResponse.json(
      { error: 'Failed to store API key' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { message: 'API key stored successfully', data },
    { status: 200 }
  )
}
