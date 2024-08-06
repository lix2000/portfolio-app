'use server'
import { log } from '@lib'

export const verifyRecaptcha = async (token?: string) => {
	const { RECAPTCHA_SECRET_KEY } = process.env
	const formData = `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
	const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: formData,
	})
	const data = await response.json()
	if (!data.success || data.score < 0.5) {
		console.error(data)
		return false
	}
	log.warn('Recaptcha verified', data)

	return true
}
