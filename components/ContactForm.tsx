'use client'
import { RequestZodSchema, FormRequestType, ServerServiceType } from '@types'
import { Button, CheckBox, DatePicker, Input, Form, TextArea, Dropzone, Select } from '@components'
import Link from 'next/link'
import { useServiceNames } from '@hooks'

const ContactForm = ({ onSubmit }: { onSubmit: (data: FormRequestType) => any }) => {
	const { data: services } = useServiceNames()

	return (
		<div className='min-w-[350px] max-w-[650px] w-full p-6 flex-col flex-center bg-white rounded-lg shadow-card hover:shadow-2xl'>
			<div className='text-title my-2'>Contact Form</div>
			<div className='text-subtitle mb-3 text-center'>
				Please fill up this contact form with your project address and tell us a little bit more about what
				you&apos;re looking to do in your home.
			</div>
			<Form<FormRequestType>
				className='w-full flex flex-col gap-4'
				onSubmit={onSubmit}
				schema={RequestZodSchema}
				recaptchaAction='request'
				resetAfterSubmit
			>
				<div className='w-full flex gap-4'>
					<Input name='fullName' type='text' placeholder='Full Name' />
					<Input name='email' type='email' placeholder='Email' />
					<Input name='phoneNumber' type='text' placeholder='Phone Number' />
				</div>
				<Input name='address' type='text' placeholder='Project Address' />
				<Select
					name='service'
					placeholder='Desired Service'
					options={(services as Pick<ServerServiceType, '_id' | 'title'>[])?.map(({ _id, title }) => ({
						value: _id,
						label: title,
					}))}
				/>
				<Input
					name='budget'
					type='text'
					placeholder='Budget (renovation Cost + Furniture) exuding designer fee'
				/>
				<Input name='date' placeholder='Desired Start Date & Timeline' />
				<TextArea name='description' placeholder='Project Description' />
				<Dropzone name='images' label='Add inspiration pictures and/or pictures of your home.' multiple />
				<CheckBox
					name='termsAndConditions'
					placeholder={
						<div>
							I agree with any applicable Terms and Conditions of CSH Greenwich Advisory. This site is
							protected by reCAPTCHA and the Google&nbsp;
							<Link
								rel='noopener noreferrer '
								target='_blank'
								className='underline'
								href={'https://policies.google.com/privacy'}
							>
								Privacy Policy
							</Link>
							&nbsp;and&nbsp;
							<Link
								rel='noopener noreferrer '
								target='_blank'
								className='underline'
								href={'https://policies.google.com/terms'}
							>
								Terms of Service
							</Link>
							&nbsp;apply.
						</div>
					}
				/>
				<Button type='submit'>Send Message</Button>
			</Form>
			<div className='text-label mt-2'>Response expected within 24 hours</div>
		</div>
	)
}

export default ContactForm
