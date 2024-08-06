'use client'
import { Title } from '@components'
import { AboutUsForm } from '../_PageSections'
import { useRouter } from 'next/navigation'
import { useCreateAboutUs } from '@hooks'

const NewAboutUs = () => {
	const router = useRouter()
	const mutation = useCreateAboutUs()

	const onCancel = () => router.push('/admin/about-us')

	return (
		<div className='w-full h-full'>
			<Title.Label>New About Us</Title.Label>
			<div className='mx-8'>
				<AboutUsForm onSubmit={mutation.mutateAsync} onCancel={onCancel} />
			</div>
		</div>
	)
}

export default NewAboutUs
