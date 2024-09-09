'use server'

import { signIn } from '@/auth'
import { ResultCode, getStringFromBuffer } from '@/lib/utils'
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { getUser } from '../login/actions'
import { AuthError } from 'next-auth'
import { createClient } from '@/utils/supabase/server'
import { toast } from 'sonner'
interface Result {
  type: string
  resultCode: ResultCode
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsedCredentials = z
    .object({
      email: z.string().email(),
      password: z.string().min(6)
    })
    .safeParse({
      email,
      password
    })

  if (parsedCredentials.success) {
    const supabase = createClient()

    try {
      // Create the user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email: parsedCredentials.data.email,
        password: parsedCredentials.data.password
      })

      if (error) {
        return {
          type: 'error',
          resultCode: ResultCode.UserAlreadyExists // Adjust this based on the specific error
        }
      } else {
        //toast.success('We have sent you a verifcation email. Please verify')
        // Optionally sign in the user immediately after signup
        // const signInResult = await supabase.auth.signInWithPassword({
        //   email: parsedCredentials.data.email,
        //   password: parsedCredentials.data.password
        // })

        // if (signInResult.error) {
        //   return {
        //     type: 'error',
        //     resultCode: ResultCode.InvalidCredentials
        //   }
        // }

        return {
          type: 'success',
          resultCode: ResultCode.VerifyEmail
        }
      }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return {
              type: 'error',
              resultCode: ResultCode.InvalidCredentials
            }
          default:
            return {
              type: 'error',
              resultCode: ResultCode.UnknownError
            }
        }
      } else {
        return {
          type: 'error',
          resultCode: ResultCode.UnknownError
        }
      }
    }
  } else {
    return {
      type: 'error',
      resultCode: ResultCode.InvalidCredentials
    }
  }
}
