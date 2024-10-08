import { createClient } from '@/utils/supabase/server'
import Projects from '@/components/project'
import { redirect } from 'next/navigation'

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

  return <Projects user={user} />
}
