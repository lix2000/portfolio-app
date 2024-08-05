import { z } from 'zod'
import { UploadApiResponse } from 'cloudinary'
import { Document } from 'mongoose'

export const ServiceZodSchema = z.object({
	title: z.string().min(1),
	price: z.string().refine(value => !isNaN(parseFloat(value)), {
		message: 'Price should be a number',
	}),
	priceDescription: z.string().optional(),
	images: z
		.object({
			newFiles: z.array(z.custom<File>()),
			existingFiles: z.array(z.custom<UploadApiResponse>()),
		})
		.refine(images => !!Object.values(images).flat().length, { message: 'Please upload at least one image' }),
	description: z.string().min(1),
	isAdditionalService: z.boolean().default(false),
})

export type FormServiceType = z.infer<typeof ServiceZodSchema>

export type ServerServiceType = Document &
	Omit<FormServiceType, 'images'> & {
		images: UploadApiResponse[]
	}
