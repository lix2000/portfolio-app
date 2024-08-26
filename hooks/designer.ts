'use client'
import { createOrEditDesigner, getDesigner } from '@actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormDesignerType } from '@types'
import toast from 'react-hot-toast'

export const useDesigner = () => {
	const result = useQuery({
		queryKey: ['designer'],
		queryFn: () => getDesigner(),
	})
	return result
}

export const useCreateOrEditDesigner = () => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationKey: ['designer'],
		mutationFn: (formValues: FormDesignerType) => {
			const { image, ...rest } = formValues
			const formData = new FormData()
			formData.append('image', image.newFiles[0])

			return createOrEditDesigner(rest, formData)
		},
		onSuccess: () => {
			toast.success('The designer was edited successfully')
			queryClient.invalidateQueries({ queryKey: ['designer'] })
		},
		onError: err => {
			toast.error(err.message)
		},
	})
	return mutation
}
