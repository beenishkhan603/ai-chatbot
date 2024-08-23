import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/utils/supabase/server'

export default async function addProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check that the method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, description, pineconeIndexName, elasticIndexName } = req.body

  // Ensure required fields are present
  if (!name || !description || !pineconeIndexName || !elasticIndexName) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // Create a server-side Supabase client
    const supabase = createClient()

    // Insert the new project into the "projects" table
    const { error } = await supabase.from('projects').insert([
      {
        name,
        description,
        pinecone_index_name: pineconeIndexName,
        elastic_index_name: elasticIndexName
      }
    ])

    if (error) {
      throw error
    }

    return res.status(200).json({ message: 'Project created successfully' })
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || 'Something went wrong' })
  }
}
