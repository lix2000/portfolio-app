'use client'

import { ServiceForm } from '@app/admin/services/_PageSections'
import { Modal } from '@components'
import { useCreateService } from '@hooks'
import { useRouter } from 'next/navigation'

const NewServiceModal = () => {
	const router = useRouter()
	const mutation = useCreateService()

	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>New Service</div>
			<ServiceForm onSubmit={mutation.mutateAsync} onCancel={closeModal} />
		</Modal>
	)
}

export default NewServiceModal
