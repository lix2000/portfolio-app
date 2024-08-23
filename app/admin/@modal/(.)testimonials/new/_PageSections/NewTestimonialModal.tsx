'use client'

import { TestimonialForm } from '@app/admin/testimonials/_PageSections'
import { Modal } from '@components'
import { useCreateTestimonial } from '@hooks'
import { useRouter } from 'next/navigation'

const NewTestimonialModal = () => {
	const router = useRouter()
	const mutation = useCreateTestimonial()

	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>New Testimonial</div>
			<TestimonialForm onSubmit={mutation.mutateAsync} onCancel={closeModal} />
		</Modal>
	)
}

export default NewTestimonialModal
