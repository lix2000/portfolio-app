'use client'
import { Button, Error, Form, Input, UnauthenticatedRoute } from '@components'
import { UserType, UserZodSchema } from '@types'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

const Login = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'
	const error = searchParams.get('error')

	const onSubmit = (data: UserType) => signIn('credentials', { ...data, callbackUrl })

	return (
		<UnauthenticatedRoute>
			<div className='w-full h-full flex items-center justify-center bg-tertiary-5'>
				<Form<UserType>
					onSubmit={onSubmit}
					schema={UserZodSchema}
					className='w-[350px] flex flex-col gap-4 shadow-card p-12 rounded-xl bg-tertiary'
				>
					<Input name='username' type='text' label='Username' placeholder='Username' />
					<Input name='password' type='password' label='Password' placeholder='Password' />
					<Button type='submit'>Login</Button>
					{error && <Error>Authentication failed</Error>}
				</Form>
			</div>
		</UnauthenticatedRoute>
	)
}

export default Login
