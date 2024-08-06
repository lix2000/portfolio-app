import { UploadApiResponse } from 'cloudinary'
import { Document } from 'mongoose'
import { z } from 'zod'

export const AboutUsZodSchema = z.object({
	_id: z.string().optional(),
	title: z.string().min(1),
	description: z.string().min(1),
	images: z
		.object({
			newFiles: z.array(z.custom<File>()),
			existingFiles: z.array(z.custom<UploadApiResponse>()),
		})
		.refine(images => !!Object.values(images).flat().length, { message: 'Please upload at least one image' }),
})

export type FormAboutUsType = z.infer<typeof AboutUsZodSchema>

export type ServerAboutUsType = Document &
	Omit<FormAboutUsType, 'images'> & {
		images: UploadApiResponse[]
	}
