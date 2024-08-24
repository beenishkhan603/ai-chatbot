import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('credentials', credentials)
        const supabase = createClient()
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const email = credentials?.email as string
          const password = credentials?.password as string
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          })
          console.log(data, error)
          if (error || !data.user) {
            return null // Return null if sign-in fails
          }

          // Optionally: Fetch additional user data from your database
          // const user = await getUser(email)
          console.log(data.user)
          return {
            ...data.user
            // Add additional user properties here if needed
          }
        }

        return null
      }
    })
  ],

  pages: {
    signIn: '/login' // Your custom sign-in page
  }
})
