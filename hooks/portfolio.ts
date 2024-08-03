'use client'

import { createPortfolio, deletePortfolio, editPortfolio, getPortfolio, getPortfolios } from '@actions'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { FormPortfolioType, ServerResponse, ServerPortfolioType } from '@types'
import { UploadApiResponse } from 'cloudinary'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const usePortfolios = () => {
	const result = useInfiniteQuery({
		queryKey: ['portfolios'],
		queryFn: ({ pageParam }) => getPortfolios({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage: ServerResponse<ServerPortfolioType[]>) =>
			lastPage.hasMore ? (lastPage.page ?? 1) + 1 : null,
	})

	return result
}

export const usePortfolio = (id: string) => {
	const result = useQuery({
		queryKey: ['portfolios', id],
		queryFn: () => getPortfolio(id),
	})

	return result
}

export const useCreatePortfolio = () => {
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['portfolios'],
		mutationFn: (formValues: FormPortfolioType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			images.newFiles.forEach((image: File) => {
				formData.append('images', image)
			})

			return createPortfolio(rest, formData)
		},
		onSuccess: () => {
			toast.success('Portfolio created successfully')
			router.push('/admin/portfolio')
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useEditPortfolio = (id: string, redirectUrl?: string) => {
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['portfolios'],
		mutationFn: (formValues: FormPortfolioType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			formValues.images.newFiles.forEach((image: File) => {
				formData.append('newImages', image)
			})
			formValues.images.existingFiles.forEach((image: UploadApiResponse) => {
				formData.append('existingImageIds', image.public_id)
			})

			return editPortfolio(id, rest, formData)
		},
		onSuccess: () => {
			toast.success('Portfolio updated successfully')
			router.push(redirectUrl ?? `/admin/portfolio/${id}`)
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useDeletePortfolio = (id: string) => {
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['portfolios'],
		mutationFn: () => deletePortfolio(id),
		onSuccess: () => {
			toast.success('Portfolio deleted successfully')
			router.push('/admin/portfolio')
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}
