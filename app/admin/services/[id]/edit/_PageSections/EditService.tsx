'use client'
import { Title } from '@components'
import { useRouter } from 'next/navigation'
import { useEditService } from '@hooks'
import { transformServiceToFormValues } from '@utils'
import { ServerServiceType } from '@types'
import { ServiceForm } from '@app/admin/services/_PageSections'

const EditService = ({ id, service }: { id: string; service: ServerServiceType }) => {
	const router = useRouter()
	const mutation = useEditService(id, '/admin/services')

	const onCancel = () => router.push('/admin/services')

	return (
		<div className='w-full h-full'>
			<Title.Label>Edit Service</Title.Label>
			<div className='mx-8'>
				<ServiceForm
					onSubmit={mutation.mutateAsync}
					onCancel={onCancel}
					defaultValues={transformServiceToFormValues(service)}
				/>
			</div>
		</div>
	)
}

export default EditService
