import { z } from 'zod'
import { Document } from 'mongoose'

export const TestimonialZodSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	rating: z.number().min(1).max(5),
	recaptchaToken: z.string().optional(),
})

export type FormTestimonialType = z.infer<typeof TestimonialZodSchema>

export type ServerTestimonialType = Document &
	FormTestimonialType & {
		createdAt: Date
		updatedAt: Date
	}
