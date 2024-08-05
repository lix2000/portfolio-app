import { createAppointment, getAppointments } from '@actions'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { FormAppointmentType, ServerAppointmentType, ServerResponse } from '@types'
import toast from 'react-hot-toast'

export const useAppointments = () => {
	const result = useInfiniteQuery({
		queryKey: ['appointments'],
		queryFn: ({ pageParam }) => getAppointments({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage: ServerResponse<ServerAppointmentType[]>) =>
			lastPage.hasMore ? (lastPage.page ?? 1) + 1 : null,
	})

	return result
}

export const useCreateAppointment = () => {
	const mutation = useMutation({
		mutationKey: ['appointments'],
		mutationFn: (formValues: FormAppointmentType) => {
			const { images, ...rest } = formValues
			//* Server Actions do not support File objects in the args yet, so we need to convert them to FormData
			const formData = new FormData()
			images.newFiles.forEach((image: File) => {
				formData.append('images', image)
			})

			return createAppointment(rest, formData)
		},
		onSuccess: () => {
			toast.success('Appointment sent successfully')
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}
