import { createRequest, getRequests } from '@actions'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { FormRequestType, ServerRequestType, ServerResponse } from '@types'
import toast from 'react-hot-toast'

export const useRequests = () => {
	const result = useInfiniteQuery({
		queryKey: ['requests'],
		queryFn: ({ pageParam }) => getRequests({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage: ServerResponse<ServerRequestType[]>) =>
			lastPage.hasMore ? (lastPage.page ?? 1) + 1 : null,
	})

	return result
}

export const useCreateRequest = () => {
	const mutation = useMutation({
		mutationKey: ['requests'],
		mutationFn: (formValues: FormRequestType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			images.newFiles.forEach((image: File) => {
				formData.append('images', image)
			})

			return createRequest(rest, formData)
		},
		onSuccess: () => {
			toast.success('Request sent successfully')
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}
