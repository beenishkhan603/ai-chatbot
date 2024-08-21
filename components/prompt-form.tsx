'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useUIState } from 'ai/rsc'

import { BotMessage, UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import axios from 'axios'
export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState<typeof AI>()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        const value = input.trim()
        setInput('')
        if (!value) return

        // Optimistically add user message UI
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>
          }
        ])

        // Submit and get response message
        // const responseMessage = await submitUserMessage(value)
        // setMessages(currentMessages => [...currentMessages, responseMessage])
        //  console.log('response Message', responseMessage)
        let data = JSON.stringify({
          project_id: '2',
          text: 'who am I?'
        })
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:8000/query_data',
          headers: {
            'access-token':
              'eyJhbGciOiJIUzI1NiIsImtpZCI6IkdQR3ZRL3p0bE11K25KK1QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3pxcmhxaGJ5YnZiYnlubXdsZHJ4LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJjMDkzNDg5MC0yOWMzLTQxNTktODRkZC1iNmZjZmRlM2M0ODMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzI0MjQyMjk3LCJpYXQiOjE3MjQyMzg2OTcsImVtYWlsIjoiYm9uZXRpODUxNEBmdXppdGVhLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJib25ldGk4NTE0QGZ1eml0ZWEuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImMwOTM0ODkwLTI5YzMtNDE1OS04NGRkLWI2ZmNmZGUzYzQ4MyJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzI0MjMyOTQ2fV0sInNlc3Npb25faWQiOiJjMDRlNDY2Ny1hYjNiLTQ1MzYtODU2ZS1mY2EwYTI5MGNjZjciLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.vNpdjkS5Nn2bkj--noKX6tvHpmD2EiDS1wZFGpzeJEM',
            'Content-Type': 'application/json'
          },
          data: data
        }

        axios
          .request(config)
          .then(response => {
            console.log(JSON.stringify(response.data))
            setMessages(currentMessages => [
              ...currentMessages,
              {
                id: nanoid(), // Generate a unique ID for the message
                display: <BotMessage content={response.data.results} /> // Display the data (e.g., as preformatted text)
              }
            ])
          })
          .catch(error => {
            console.log(error)
          })
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
              onClick={() => {
                router.push('/new')
              }}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
