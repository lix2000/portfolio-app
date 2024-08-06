'use client'
import { PortfolioForm } from '@app/admin/portfolio/_PageSections'
import { Modal } from '@components'
import { useEditPortfolio, usePortfolio } from '@hooks'
import { transformPortfolioToFormValues } from '@utils'
import { useRouter } from 'next/navigation'

const EditPortfolioModal = ({ id }: { id: string }) => {
	const router = useRouter()
	const mutation = useEditPortfolio(id)
	const { data: portfolio } = usePortfolio(id)
	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>Edit Portfolio</div>
			<PortfolioForm
				onSubmit={mutation.mutateAsync}
				onCancel={closeModal}
				defaultValues={transformPortfolioToFormValues(portfolio)}
			/>
		</Modal>
	)
}

export default EditPortfolioModal
