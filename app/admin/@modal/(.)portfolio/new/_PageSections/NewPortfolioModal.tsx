'use client'

import { PortfolioForm } from '@app/admin/portfolio/_PageSections'
import { Modal } from '@components'
import { useCreatePortfolio } from '@hooks'
import { useRouter } from 'next/navigation'

const NewPortfolioModal = () => {
	const router = useRouter()
	const mutation = useCreatePortfolio()

	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>New Portfolio</div>
			<PortfolioForm onSubmit={mutation.mutateAsync} onCancel={closeModal} />
		</Modal>
	)
}

export default NewPortfolioModal
