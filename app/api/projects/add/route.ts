import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Handle POST requests
export async function POST(req: Request) {
  const { name, description, pineconeKey, elasticKey, user_id } =
    await req.json()

  // Ensure required fields are present
  if (!name || !description || !pineconeKey || !elasticKey) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    )
  }

  try {
    // Create a server-side Supabase client
    const supabase = createClient()
    // Insert the new project into the "projects" table
    const { error } = await supabase.from('projects').insert([
      {
        name,
        description,
        pinecone_index_name: pineconeKey,
        elastic_index_name: elasticKey,
        user_id
      }
    ])

    if (error) {
      throw error
    }

    return NextResponse.json(
      { message: 'Project created successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
