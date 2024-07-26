'use client'
import { FormServiceType, ServerServiceType } from '@types'

export const transformServiceToFormValues = (service: ServerServiceType) => {
	const { images, ...rest } = service || {}
	const transformedService: FormServiceType = {
		...rest,
		images: {
			newFiles: [],
			existingFiles: images,
		},
	}

	return transformedService
}
