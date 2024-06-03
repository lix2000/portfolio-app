import { z } from 'zod'

export const ContactZodSchema = z.object({
  firstName: z.string().min(3).max(32),
  lastName: z.string().min(6).max(128),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]+$/, {
      message: 'Invalid phone number format',
    })
    .optional(),
  tellUsMore: z.string().min(3).max(500),
  termsAndConditions: z.boolean().refine(value => value === true, {
    message: 'Terms and conditions must be accepted',
  }),
})

export type ContactType = z.infer<typeof ContactZodSchema>
