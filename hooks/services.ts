'use client'

import { createService, deleteService, editService, getServices } from '@actions'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { FormServiceType, ServerResponse, ServerServiceType } from '@types'
import { UploadApiResponse } from 'cloudinary'
import { FilterQuery } from 'mongoose'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useServices = ({ filter }: { filter?: FilterQuery<ServerServiceType> }) => {
	const result = useInfiniteQuery({
		queryKey: ['services'],
		queryFn: ({ pageParam }) => getServices({ page: pageParam, filter }),
		initialPageParam: 1,
		getNextPageParam: (lastPage: ServerResponse<ServerServiceType[]>) =>
			lastPage.hasMore ? (lastPage.page ?? 1) + 1 : null,
	})

	return result
}

export const useCreateService = () => {
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['services'],
		mutationFn: (formValues: FormServiceType) => {
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			Object.entries(formValues).forEach(
				([key, value]) => typeof value !== 'object' && formData.append(key, value)
			)
			formValues.images.newFiles.forEach((image: File) => {
				formData.append('images', image)
			})

			return createService(formData)
		},
		onSuccess: () => {
			toast.success('Service created successfully')
			router.push('/admin/services')
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useEditService = (id: string, redirectUrl?: string) => {
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['services'],
		mutationFn: (formValues: FormServiceType) => {
			const formData = new FormData()
			Object.entries(formValues).forEach(
				([key, value]) => typeof value !== 'object' && formData.append(key, value)
			)
			formValues.images.newFiles.forEach((image: File) => {
				formData.append('newImages', image)
			})
			formValues.images.existingFiles.forEach((image: UploadApiResponse) => {
				formData.append('existingImageIds', image.public_id)
			})
			return editService(id, formData)
		},
		onSuccess: () => {
			toast.success('Service updated successfully')
			router.push(redirectUrl ?? `/admin/services/${id}`)
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useDeleteService = (id: string) => {
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['services'],
		mutationFn: () => deleteService(id),
		onSuccess: () => {
			toast.success('Service deleted successfully')
			router.push('/admin/services')
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}
