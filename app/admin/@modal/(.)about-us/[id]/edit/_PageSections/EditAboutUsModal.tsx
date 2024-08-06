'use client'
import { AboutUsForm } from '@app/admin/about-us/_PageSections'
import { Modal } from '@components'
import { useEditAboutUs, useAboutUs } from '@hooks'
import { transformAboutUsToFormValues } from '@utils'
import { useRouter } from 'next/navigation'

const EditAboutUsModal = ({ id }: { id: string }) => {
	const router = useRouter()
	const mutation = useEditAboutUs(id, '/admin/about-us')
	const { data: aboutUs } = useAboutUs(id)
	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>Edit About Us</div>
			<AboutUsForm
				onSubmit={mutation.mutateAsync}
				onCancel={closeModal}
				defaultValues={transformAboutUsToFormValues(aboutUs)}
			/>
		</Modal>
	)
}

export default EditAboutUsModal
