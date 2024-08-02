import { z } from 'zod'

export const ContactZodSchema = z.object({
	fullName: z.string().min(3).max(32),
	email: z.string().email(),
	tellUsMore: z.string().min(3).max(500),
	termsAndConditions: z.boolean().refine(value => value === true, {
		message: 'Terms and conditions must be accepted',
	}),
	date: z.date(),
	serviceType: z.string().min(1),
	budget: z.string().min(1),
	address: z.string().min(1),
	phoneNumber: z
		.string()
		.regex(/^\+?[0-9]+$/, {
			message: 'Invalid phone number format',
		})
		.optional(),
	images: z.array(z.custom<File>()),
})

export type ContactType = z.infer<typeof ContactZodSchema>
