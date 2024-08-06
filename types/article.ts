import { UploadApiResponse } from 'cloudinary'
import { Document } from 'mongoose'
import { z } from 'zod'

export const ArticleZodSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	images: z
		.object({
			newFiles: z.array(z.custom<File>()),
			existingFiles: z.array(z.custom<UploadApiResponse>()),
		})
		.refine(images => !!Object.values(images).flat().length, { message: 'Please upload at least one image' }),
})

export type FormArticleType = z.infer<typeof ArticleZodSchema>

export type ServerArticleType = Document &
	Omit<FormArticleType, 'images'> & {
		images: UploadApiResponse[]
	}
