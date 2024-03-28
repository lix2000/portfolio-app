import { z } from 'zod'

export const AboutUsZodSchema = z.object({
	_id: z.string().optional(),
	title: z.string().min(1),
	images: z.array(z.string()).nonempty(),
	description: z.string().min(1),
	longDescription: z.string().min(1),
})

export type AboutUsType = z.infer<typeof AboutUsZodSchema>
