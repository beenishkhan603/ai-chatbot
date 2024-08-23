'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
// import { useAuth } from '@/context/authContext';

const Projects = () => {
  //   const { session } = useAuth()
  const form = useForm({
    resolver: zodResolver(ProjectSchema)
  })

  const [submitError, setSubmitError] = useState('')
  //   const uuid = session?.user?.id
  //   const form = useForm({
  //     resolver: zodResolver(ProjectSchema)
  //   })

  const onSubmit = async (data: any) => {
    // const { name, description, pineconeKey, elasticKey } = data
    // const { data: supabaseData, error } = await supabase
    //   .from('projects')
    //   .insert([
    //     {
    //       name,
    //       description,
    //       pinecone_index_name: pineconeKey,
    //       elastic_index_name: elasticKey,
    //       user_id: uuid
    //     }
    //   ])
    // if (error) {
    //   console.error('Error creating project:', error)
    //   setSubmitError('Error creating project: ' + error.message)
    // } else {
    //   console.log('Project created successfully:', supabaseData)
    //   form.reset()
    //   setSubmitError('')
    // }
  }
  return (
    <div className="flex flex-col gap-2 space-y-3">
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
