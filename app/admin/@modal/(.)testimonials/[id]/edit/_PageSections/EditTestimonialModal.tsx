'use client'

import { TestimonialForm } from '@app/admin/testimonials/_PageSections'
import { Modal } from '@components'
import { useEditTestimonial, useTestimonial } from '@hooks'
import { useRouter } from 'next/navigation'

const EditTestimonialModal = ({ id }: { id: string }) => {
	const router = useRouter()
	const { data: testimonial } = useTestimonial(id)
	const mutation = useEditTestimonial(id, `/admin/testimonials`)

	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>Edit Testimonial</div>
			<TestimonialForm onSubmit={mutation.mutateAsync} onCancel={closeModal} defaultValues={testimonial} />
		</Modal>
	)
}

export default EditTestimonialModal
