'use client'
import { Title } from '@components'
import { useRouter } from 'next/navigation'
import { useEditTestimonial, useTestimonial } from '@hooks'
import { TestimonialForm } from '@app/admin/testimonials/_PageSections'

const REDIRECT_URL = '/admin/testimonials'

const EditTestimonial = ({ id }: { id: string }) => {
	const router = useRouter()
	const { data: testimonial } = useTestimonial(id)
	const mutation = useEditTestimonial(id, REDIRECT_URL)

	const onCancel = () => router.push(REDIRECT_URL)

	return (
		<div className='w-full h-full'>
			<Title.Label>Edit Testimonial</Title.Label>
			<div className='mx-8'>
				<TestimonialForm onSubmit={mutation.mutateAsync} onCancel={onCancel} defaultValues={testimonial} />
			</div>
		</div>
	)
}

export default EditTestimonial
