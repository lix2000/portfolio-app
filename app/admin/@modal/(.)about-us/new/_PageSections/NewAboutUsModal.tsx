'use client'

import { AboutUsForm } from '@app/admin/about-us/_PageSections'
import { Modal } from '@components'
import { useCreateAboutUs } from '@hooks'
import { useRouter } from 'next/navigation'

const NewAboutUsModal = () => {
	const router = useRouter()
	const mutation = useCreateAboutUs()

	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>New About Us</div>
			<AboutUsForm onSubmit={mutation.mutateAsync} onCancel={closeModal} />
		</Modal>
	)
}

export default NewAboutUsModal
