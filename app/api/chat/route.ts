import { NextResponse } from 'next/server'
import axios from 'axios'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const handleLogoutAndRedirect = async () => {
  try {
    // Sign out the user from Supabase or NextAuth
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (signOutError) {
    console.error('Error during sign-out:', signOutError)
  }
}

export async function POST(req: Request) {
  const supabase = createClient()
  const { data: session, error: sessionError } =
    await supabase.auth.getSession()
  if (sessionError || !session) {
    // Handle case where there is no session
    return await handleLogoutAndRedirect()
  }

  try {
    const body = await req.json()
    console.log('body ==>', body)
    // Forward the request to your backend service
    const response = await axios.post(
      `${process.env.BACKEND_URL}/query_data`,
      body,
      {
        headers: {
          'access-token': session?.session?.access_token || null,
          'Content-Type': 'application/json'
        },
        maxBodyLength: Infinity
      }
    )
    console.log(response.data)
    return NextResponse.json({ data: response.data }, { status: 200 })
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized errors
      console.error('Unauthorized error, logging out:', error)
      return await handleLogoutAndRedirect()
    } else {
      if (error.message.includes('Invalid Refresh Token')) {
        // Handle token-related errors
        await handleLogoutAndRedirect()
      } else {
        console.error(
          'Unexpected error:',
          error.response.data.detail,
          error.response.status
        )
        return NextResponse.json(
          { error },
          { status: error?.response?.status || 500 }
        )
      }
    }
  }
}
