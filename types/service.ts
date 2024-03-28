import { z } from 'zod'

export const ServiceZodSchema = z.object({
	_id: z.string().uuid().optional(),
	title: z.string().min(1),
	price: z.number().min(0),
	images: z.array(z.string()).nonempty(),
	description: z.string().min(1),
	longDescription: z.string().min(1),
})

export type ServiceType = z.infer<typeof ServiceZodSchema>
