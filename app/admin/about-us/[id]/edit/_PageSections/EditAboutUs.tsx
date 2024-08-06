'use client'
import { Title } from '@components'
import { useRouter } from 'next/navigation'
import { useEditAboutUs } from '@hooks'
import { transformAboutUsToFormValues } from '@utils'
import { ServerAboutUsType } from '@types'
import { AboutUsForm } from '@app/admin/about-us/_PageSections'

const EditAboutUs = ({ id, aboutUs }: { id: string; aboutUs: ServerAboutUsType }) => {
	const router = useRouter()
	const mutation = useEditAboutUs(id, '/admin/about-us')

	const onCancel = () => router.push('/admin/about-us')

	return (
		<div className='w-full h-full'>
			<Title.Label>Edit About Us</Title.Label>
			<div className='mx-8'>
				<AboutUsForm
					onSubmit={mutation.mutateAsync}
					onCancel={onCancel}
					defaultValues={transformAboutUsToFormValues(aboutUs)}
				/>
			</div>
		</div>
	)
}

export default EditAboutUs
