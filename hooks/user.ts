'use client'
import { verifyRecaptcha } from '@actions'
import { useMutation } from '@tanstack/react-query'
import { UserType } from '@types'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

export const useLogin = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'
	const mutation = useMutation({
		mutationKey: ['login'],
		mutationFn: async (data: UserType) => {
			const { recaptchaToken, ...rest } = data
			const isHuman = await verifyRecaptcha(recaptchaToken)
			if (!isHuman) {
				throw new Error('Human verification failed')
			}
			return signIn('credentials', { ...rest, callbackUrl })
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return mutation
}
