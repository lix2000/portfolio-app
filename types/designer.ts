import { UploadApiResponse } from 'cloudinary'
import { Document } from 'mongoose'
import { z } from 'zod'

export const DesignerZodSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	phone: z.string().min(1),
	description: z.string().min(1),
	image: z
		.object({
			newFiles: z.array(z.custom<File>()),
			existingFiles: z.array(z.custom<UploadApiResponse>()),
		})
		.refine(images => Object.values(images).flat().length === 1, { message: 'Please upload  one image' }),
})

export type FormDesignerType = z.infer<typeof DesignerZodSchema>

export type ServerDesignerType = Document &
	Omit<FormDesignerType, 'image'> & {
		image: UploadApiResponse
	}
