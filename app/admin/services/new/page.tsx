'use client'
import { Title } from '@components'
import { ServiceForm } from '../_PageSections'
import { useRouter } from 'next/navigation'
import { useCreateService } from '@hooks'

const NewService = () => {
	const router = useRouter()
	const mutation = useCreateService()

	const onCancel = () => router.push('/admin/services')

	return (
		<div className='w-full h-full'>
			<Title.Label>New Service</Title.Label>
			<div className='mx-8'>
				<ServiceForm onSubmit={mutation.mutate} onCancel={onCancel} />
			</div>
		</div>
	)
}

export default NewService
