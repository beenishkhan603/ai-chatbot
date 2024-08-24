import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import APIKey from '@/components/apiKey'

export default async function ProjectsPage() {
  const supabase = createClient()

  // Get the authenticated user's data securely
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return <APIKey user={user} />
}
