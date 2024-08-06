'use client'
import { Button, Error, Form, Input, UnauthenticatedRoute } from '@components'
import { useLogin } from '@hooks'
import { UserType, UserZodSchema } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Login = () => {
	const mutation = useLogin()
	const searchParams = useSearchParams()
	const error = searchParams.get('error')

	const onSubmit = async (data: UserType) => await mutation.mutateAsync(data)

	return (
		<UnauthenticatedRoute>
			<div className='w-full h-full flex items-center justify-center bg-tertiary-5'>
				<div className='w-[350px] relative flex flex-col items-center gap-4 shadow-card p-12 rounded-xl bg-tertiary'>
					<Link href='/'>
						<Image
							className='ring-1 ring-primary rounded-full'
							src='/images/logo.png'
							height={100}
							width={100}
							alt='logo'
						/>
					</Link>
					<Form<UserType>
						className='w-full flex flex-col gap-4'
						onSubmit={onSubmit}
						schema={UserZodSchema}
						recaptchaAction='login'
					>
						<Input name='username' type='text' label='Username' placeholder='Username' />
						<Input name='password' type='password' label='Password' placeholder='Password' />
						<Button type='submit'>Login</Button>
						{error && <Error>Authentication failed</Error>}
					</Form>
				</div>
			</div>
		</UnauthenticatedRoute>
	)
}

export default Login
