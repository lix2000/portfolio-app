'use client'
import {
	FormAboutUsType,
	FormArticleType,
	FormDesignerType,
	FormPortfolioType,
	FormServiceType,
	ServerAboutUsType,
	ServerArticleType,
	ServerDesignerType,
	ServerPortfolioType,
	ServerServiceType,
} from '@types'

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

export const transformAboutUsToFormValues = (aboutUs?: ServerAboutUsType) => {
	if (!aboutUs) return
	const { images, ...rest } = aboutUs || {}
	const transformedAboutUs: FormAboutUsType = {
		...rest,
		images: {
			newFiles: [],
			existingFiles: images,
		},
	}

	return transformedAboutUs
}

export const transformArticleToFormValues = (article?: ServerArticleType) => {
	if (!article) return
	const { images, ...rest } = article || {}
	const transformedArticle: FormArticleType = {
		...rest,
		images: {
			newFiles: [],
			existingFiles: images,
		},
	}

	return transformedArticle
}

export const transformDesignerToFormValues = (designer?: ServerDesignerType | null) => {
	if (!designer) return
	const { image, ...rest } = designer || {}
	const transformedDesigner: FormDesignerType = {
		...rest,
		image: {
			newFiles: [],
			existingFiles: [image],
		},
	}

	return transformedDesigner
}
