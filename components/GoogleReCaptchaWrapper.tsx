'use client'
import { PropsWithChildren } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const GoogleReCaptchaWrapper = ({ children }: PropsWithChildren) => {
	const key = process.env.NEXT_PUBLIC_RECAPTCHA_KEY

	return <GoogleReCaptchaProvider reCaptchaKey={key ?? 'NOT DEFINED'}>{children}</GoogleReCaptchaProvider>
}

export default GoogleReCaptchaWrapper
