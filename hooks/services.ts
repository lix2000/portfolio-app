'use client'

import { createService, deleteService, editService, getServices, getService, getServiceNames } from '@actions'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormServiceType, ServerResponse, ServerServiceType } from '@types'
import { UploadApiResponse } from 'cloudinary'
import { FilterQuery } from 'mongoose'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useServices = (params?: { filter?: FilterQuery<ServerServiceType> }) => {
	const { filter } = params || {}
	const result = useInfiniteQuery({
		queryKey: ['services', JSON.stringify(filter)],
		queryFn: ({ pageParam }) => getServices({ page: pageParam, filter }),
		initialPageParam: 1,
		getNextPageParam: (lastPage: ServerResponse<ServerServiceType[]>) =>
			lastPage.hasMore ? (lastPage.page ?? 1) + 1 : null,
	})

	return result
}

export const useServiceNames = () => {
	const result = useQuery({
		queryKey: ['serviceNames'],
		queryFn: () => getServiceNames(),
	})

	return result
}

export const useService = (id: string) => {
	const result = useQuery({
		queryKey: ['services', id],
		queryFn: () => getService(id),
	})

	return result
}

export const useCreateService = () => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationKey: ['services'],
		mutationFn: (formValues: FormServiceType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			images.newFiles.forEach((image: File) => {
				formData.append('images', image)
			})

			return createService(rest, formData)
		},
		onSuccess: () => {
			toast.success('Service created successfully')
			router.push('/admin/services')
			queryClient.invalidateQueries({ queryKey: ['services'] })
			queryClient.invalidateQueries({ queryKey: ['serviceCount'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useEditService = (id: string, redirectUrl?: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['services'],
		mutationFn: (formValues: FormServiceType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			formValues.images.newFiles.forEach((image: File) => {
				formData.append('newImages', image)
			})
			formValues.images.existingFiles.forEach((image: UploadApiResponse) => {
				formData.append('existingImageIds', image.public_id)
			})

			return editService(id, rest, formData)
		},
		onSuccess: () => {
			toast.success('Service updated successfully')
			router.push(redirectUrl ?? `/admin/services/${id}`)
			queryClient.invalidateQueries({ queryKey: ['services'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useDeleteService = (id: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['services'],
		mutationFn: () => deleteService(id),
		onSuccess: () => {
			toast.success('Service deleted successfully')
			router.push('/admin/services')
			queryClient.invalidateQueries({ queryKey: ['services'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}
