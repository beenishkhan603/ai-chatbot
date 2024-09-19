import { z } from 'zod'

const ProjectSchema = z.object({
  name: z.string().min(2, {
    message: 'Project name must be at least 2 characters.'
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
  // pineconeKey: z.string().min(1, {
  // 	message: 'Pinecone key is required.',
  // }),
  // elasticKey: z.string().min(1, {
  // 	message: 'Elastic key is required.',
  // }),
})
export { ProjectSchema }
