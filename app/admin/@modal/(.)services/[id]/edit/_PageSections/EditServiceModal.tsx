'use client'
import { ServiceForm } from '@app/admin/services/_PageSections'
import { Modal } from '@components'
import { useEditService, useServices } from '@hooks'
import { ServerServiceType } from '@types'
import { transformServiceToFormValues } from '@utils'
import { useRouter } from 'next/navigation'

const EditServiceModal = ({ id }: { id: string }) => {
	const router = useRouter()
	const mutation = useEditService(id)
	const { data } = useServices()
	const service = data?.pages.flatMap(page => page.data).find(service => service._id === id)
	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>Edit Service</div>
			<ServiceForm
				onSubmit={mutation.mutate}
				onCancel={closeModal}
				defaultValues={transformServiceToFormValues(service as ServerServiceType)}
			/>
		</Modal>
	)
}

export default EditServiceModal
