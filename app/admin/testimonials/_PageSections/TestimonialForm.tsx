import { Button, Form, Input, StarRatingInput, TextArea } from '@components'
import { FormTestimonialType, TestimonialZodSchema } from '@types'

type Props = {
	onSubmit: (data: FormTestimonialType) => Promise<any>
	onCancel: () => void
	defaultValues?: FormTestimonialType
}

const TestimonialForm = ({ onSubmit, onCancel, defaultValues }: Props) => (
	<Form<FormTestimonialType>
		className='w-full flex flex-col gap-4'
		schema={TestimonialZodSchema}
		onSubmit={onSubmit}
		defaultValues={defaultValues}
		recaptchaAction='testimonial'
	>
		<Input name='name' label='Name' placeholder='Name' />
		<TextArea name='description' label='Comment' placeholder='Comment' />
		<div className='flex-center mb-4'>
			<StarRatingInput name='rating' />
		</div>
		<Button type='submit'>Save</Button>
		<Button type='button' onClick={onCancel} theme='tertiary'>
			Cancel
		</Button>
	</Form>
)

export default TestimonialForm
