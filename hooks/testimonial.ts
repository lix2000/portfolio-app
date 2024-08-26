'use client'
import {
	createTestimonial,
	deleteTestimonial,
	editTestimonial,
	getTestimonial,
	getTestimonials,
} from '@actions'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormTestimonialType, ServerResponse, ServerTestimonialType } from '@types'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useTestimonials = (options: { limit?: number } = {}) => {
	const { limit } = options
	const result = useInfiniteQuery({
		queryKey: ['testimonials'],
		queryFn: ({ pageParam }) => getTestimonials({ page: pageParam, limit }),
		initialPageParam: 1,
		getNextPageParam: (lastPage: ServerResponse<ServerTestimonialType[]>) =>
			lastPage.hasMore ? (lastPage.page ?? 1) + 1 : null,
	})

	return result
}

export const useTestimonial = (id: string) => {
	const result = useQuery({
		queryKey: ['testimonials', id],
		queryFn: () => getTestimonial(id),
	})

	return result
}

export const useCreateTestimonial = () => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['testimonials'],
		mutationFn: createTestimonial,
		onSuccess: () => {
			toast.success('Testimonial created successfully')
			router.push('/admin/testimonials')
			queryClient.invalidateQueries({ queryKey: ['testimonials'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useEditTestimonial = (id: string, redirectUrl?: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const mutation = useMutation({
		mutationKey: ['testimonials', id],
		mutationFn: (testimonial: FormTestimonialType) => editTestimonial(id, testimonial),
		onSuccess: () => {
			toast.success('Testimonial updated successfully')
			router.push(redirectUrl ?? `/admin/testimonials/${id}`)
			queryClient.invalidateQueries({ queryKey: ['testimonials'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}

export const useDeleteTestimonial = (id: string) => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationKey: ['testimonials', id],
		mutationFn: () => deleteTestimonial(id),
		onSuccess: () => {
			toast.success('Testimonial deleted successfully')
			queryClient.invalidateQueries({ queryKey: ['testimonials'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}
