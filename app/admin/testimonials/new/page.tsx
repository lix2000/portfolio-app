'use client'
import { Title } from '@components'
import { TestimonialForm } from '../_PageSections'
import { useRouter } from 'next/navigation'
import { useCreateTestimonial } from '@hooks'

const NewTestimonial = () => {
	const router = useRouter()
	const mutation = useCreateTestimonial()

	const onCancel = () => router.push('/admin/testimonials')

	return (
		<div className='w-full h-full'>
			<Title.Label>New Testimonial</Title.Label>
			<div className='mx-8'>
				<TestimonialForm onSubmit={mutation.mutateAsync} onCancel={onCancel} />
			</div>
		</div>
	)
}

export default NewTestimonial
