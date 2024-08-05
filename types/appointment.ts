import { UploadApiResponse } from 'cloudinary'
import { z } from 'zod'
import { ServerServiceType } from './service'
import { Document } from 'mongoose'

export const AppointmentZodSchema = z.object({
	fullName: z.string().min(3).max(32),
	email: z.string().email(),
	description: z.string().min(3).max(500),
	termsAndConditions: z.boolean().refine(value => value === true, {
		message: 'Terms and conditions must be accepted',
	}),
	date: z.date(),
	service: z.string().min(1),
	budget: z.string().min(1),
	address: z.string().min(1),
	phoneNumber: z
		.string()
		.regex(/^\+?[0-9]+$/, {
			message: 'Invalid phone number format',
		})
		.optional(),
	images: z.object({
		newFiles: z.array(z.custom<File>()),
	}),
	recaptchaToken: z.string().optional(),
})

export type FormAppointmentType = z.infer<typeof AppointmentZodSchema>

export type ServerAppointmentType = Document &
	Omit<FormAppointmentType, 'images' | 'service'> & {
		service: ServerServiceType['_id']
		images: UploadApiResponse[]
		isViewed: boolean
	}
