import * as React from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { IconNextChat, IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'

interface UserOrLoginProps {
  user: any // Replace 'any' with your User type
}

async function UserOrLogin() {
  const supabase = createClient()

  // Fetch the user securely from Supabase
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload() // Reload the page to reflect the logout state
  }

  return (
    <div className="flex  items-center w-full justify-between">
      <div className="flex items-center space-x-4 justify-start">
        {user ? (
          <>
            <SidebarMobile>
              <ChatHistory userId={user.id} />
            </SidebarMobile>
            <SidebarToggle />
            <Link href="/project">
              <Button variant="link" className="text-white">
                Project
              </Button>
            </Link>
            <Link href="/apikey">
              <Button variant="link" className="text-white">
                API Key
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="link" className="text-white">
                Chat
              </Button>
            </Link>
          </>
        ) : (
          <Link href="/new" rel="nofollow">
            <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
            <IconNextChat className="hidden size-6 mr-2 dark:block" />
          </Link>
        )}
      </div>
      <div className="justinfy-end">
        {user ? (
          <>
            <UserMenu user={user} />
          </>
        ) : (
          <Button variant="link" asChild className="text-white -ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
export default UserOrLogin
