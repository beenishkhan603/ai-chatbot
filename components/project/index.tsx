'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ProjectSchema } from '@/utils/validations/zodValidation'

const Projects = ({ user }: { user: any }) => {
  const form = useForm({
    resolver: zodResolver(ProjectSchema)
  })

  const [submitError, setSubmitError] = useState('')
  const uuid = user?.id
  const onSubmit = async (data: any) => {
    const response = await fetch('/api/projects/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create project')
    } else {
      console.log('Project created successfully:')
      form.reset()
      setSubmitError('')
    }
  }
  return (
    <div className="flex flex-col gap-2 space-y-3 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter project description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pineconeKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pinecone Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Pinecone key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="elasticKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Elastic Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Elastic key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {submitError && <p className="text-red-500">{submitError}</p>}
              <Button type="submit">Create Project</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
export default Projects
