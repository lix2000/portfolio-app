import { ContactType, ContactZodSchema } from '@types'
import { Button, CheckBox, DatePicker, Radio, Input, Form, TextArea, Dropzone } from '@components'
import Link from 'next/link'
import { serviceTypes } from '@lib/settings'

const ContactForm = ({ onSubmit }: { onSubmit: (data: ContactType) => any }) => {
	return (
		<div className='min-w-[350px] max-w-[650px] w-full p-6 flex-col flex-center bg-white rounded-lg shadow-card hover:shadow-2xl'>
			<div className='text-title my-2'>Contact Form</div>
			<div className='text-subtitle mb-3 text-center'>
				Please fill up this contact form with your project address and tell us a little bit more about what
				you're looking to do in your home.
			</div>
			<Form<ContactType> className='w-full flex flex-col gap-4' onSubmit={onSubmit} schema={ContactZodSchema}>
				<div className='w-full flex gap-4'>
					<Input name='fullName' type='text' placeholder='First Name' />
					<Input name='email' type='email' placeholder='Email' />
					<Input name='phoneNumber' type='text' placeholder='Phone Number' />
				</div>
				<Input name='address' type='text' placeholder='Project Address' />
				<Radio name='serviceType' label='Desired Service' options={serviceTypes} />
				<Input
					name='budget'
					type='text'
					placeholder='Budget (renovation Cost + Furniture) exuding designer fee'
				/>
				<DatePicker name='date' />
				<TextArea name='tellUsMore' placeholder='Project Description' />
				<Dropzone name='images' label='Upload Images' />
				<CheckBox
					name='termsAndConditions'
					placeholder={
						<div>
							I agree with any applicable Terms and Conditions of CSH Greenwich Advisory. This site is
							protected by reCAPTCHA and the Google
							<Link
								rel='noopener noreferrer '
								target='_blank'
								className='underline'
								href={'https://policies.google.com/privacy'}
							>
								Privacy Policy
							</Link>{' '}
							and
							<Link
								rel='noopener noreferrer '
								target='_blank'
								className='underline'
								href={'https://policies.google.com/terms'}
							>
								Terms of Service
							</Link>{' '}
							apply.
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
