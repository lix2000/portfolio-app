'use client'
import { FormPortfolioType, FormServiceType, ServerPortfolioType, ServerServiceType } from '@types'

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

export const transformPortfolioToFormValues = (portfolio?: ServerPortfolioType) => {
	if (!portfolio) return
	const { images, ...rest } = portfolio || {}
	const transformedPortfolio: FormPortfolioType = {
		...rest,
		images: {
			newFiles: [],
			existingFiles: images,
		},
	}

	return transformedPortfolio
}
