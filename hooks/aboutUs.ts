'use client'

import { createAboutUs, deleteAboutUs, editAboutUs, getAboutUs, getAboutUsById } from '@actions'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { FormAboutUsType, ServerResponse, ServerAboutUsType } from '@types'
import { UploadApiResponse } from 'cloudinary'
import { FilterQuery } from 'mongoose'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useAboutUses = (params?: { filter?: FilterQuery<ServerAboutUsType> }) => {
	const { filter } = params || {}
	const result = useInfiniteQuery({
		queryKey: ['aboutUses', JSON.stringify(filter)],
		queryFn: ({ pageParam }) => getAboutUs({ page: pageParam, filter }),
		initialPageParam: 1,
		getNextPageParam: (lastPage: ServerResponse<ServerAboutUsType[]>) =>
			lastPage.hasMore ? (lastPage.page ?? 1) + 1 : null,
	})

	return result
}

export const useAboutUs = (id: string) => {
	const result = useQuery({
		queryKey: ['aboutUses', id],
		queryFn: () => getAboutUsById(id),
	})

	return result
}

export const useCreateAboutUs = () => {
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['aboutUses'],
		mutationFn: (formValues: FormAboutUsType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			images.newFiles.forEach((image: File) => {
				formData.append('images', image)
			})
			return createAboutUs(rest, formData)
		},
		onSuccess: () => {
			toast.success('AboutUs created successfully')
			router.push('/admin/about-us')
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useEditAboutUs = (id: string, redirectUrl?: string) => {
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['aboutUses'],
		mutationFn: (formValues: FormAboutUsType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			formValues.images.newFiles.forEach((image: File) => {
				formData.append('newImages', image)
			})
			formValues.images.existingFiles.forEach((image: UploadApiResponse) => {
				formData.append('existingImageIds', image.public_id)
			})
			return editAboutUs(id, rest, formData)
		},
		onSuccess: () => {
			toast.success('AboutUs updated successfully')
			router.push(redirectUrl ?? `/admin/about-us/${id}`)
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useDeleteAboutUs = (id: string) => {
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['aboutUses'],
		mutationFn: () => deleteAboutUs(id),
		onSuccess: () => {
			toast.success('AboutUs deleted successfully')
			router.push('/admin/about-us')
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}
