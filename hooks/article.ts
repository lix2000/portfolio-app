'use client'

import { createArticle, deleteArticle, editArticle, getArticles, getArticle } from '@actions'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormArticleType, ServerResponse, ServerArticleType } from '@types'
import { UploadApiResponse } from 'cloudinary'
import { FilterQuery } from 'mongoose'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useArticles = (params?: { filter?: FilterQuery<ServerArticleType> }) => {
	const { filter } = params || {}
	const result = useInfiniteQuery({
		queryKey: ['articles', JSON.stringify(filter)],
		queryFn: ({ pageParam }) => getArticles({ page: pageParam, filter }),
		initialPageParam: 1,
		getNextPageParam: (lastPage: ServerResponse<ServerArticleType[]>) =>
			lastPage.hasMore ? (lastPage.page ?? 1) + 1 : null,
	})

	return result
}

export const useArticle = (id: string) => {
	const result = useQuery({
		queryKey: ['articles', id],
		queryFn: () => getArticle(id),
	})

	return result
}

export const useCreateArticle = () => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['articles'],
		mutationFn: (formValues: FormArticleType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			images.newFiles.forEach((image: File) => {
				formData.append('images', image)
			})

			return createArticle(rest, formData)
		},
		onSuccess: () => {
			toast.success('Article created successfully')
			router.push('/admin/articles')
			queryClient.invalidateQueries({ queryKey: ['articles'] })
			queryClient.invalidateQueries({ queryKey: ['articleCount'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useEditArticle = (id: string, redirectUrl?: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['articles'],
		mutationFn: (formValues: FormArticleType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			formValues.images.newFiles.forEach((image: File) => {
				formData.append('newImages', image)
			})
			formValues.images.existingFiles.forEach((image: UploadApiResponse) => {
				formData.append('existingImageIds', image.public_id)
			})

			return editArticle(id, rest, formData)
		},
		onSuccess: () => {
			toast.success('Article updated successfully')
			router.push(redirectUrl ?? `/admin/articles/${id}`)
			queryClient.invalidateQueries({ queryKey: ['articles'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useDeleteArticle = (id: string) => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationKey: ['articles'],
		mutationFn: () => deleteArticle(id),
		onSuccess: () => {
			toast.success('Article deleted successfully')
			router.push('/admin/articles')
			queryClient.invalidateQueries({ queryKey: ['articles'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}
