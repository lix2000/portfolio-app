'use client'
import { Title } from '@components'
import { useRouter } from 'next/navigation'
import { useEditPortfolio } from '@hooks'
import { transformPortfolioToFormValues } from '@utils'
import { ServerPortfolioType } from '@types'
import { PortfolioForm } from '@app/admin/portfolio/_PageSections'

const EditPortfolio = ({ id, portfolio }: { id: string; portfolio: ServerPortfolioType }) => {
	const router = useRouter()
	const mutation = useEditPortfolio(id, '/admin/portfolio')

	const onCancel = () => router.push('/admin/portfolio')

	return (
		<div className='w-full h-full'>
			<Title.Label>Edit Portfolio</Title.Label>
			<div className='mx-8'>
				<PortfolioForm
					onSubmit={mutation.mutateAsync}
					onCancel={onCancel}
					defaultValues={transformPortfolioToFormValues(portfolio)}
				/>
			</div>
		</div>
	)
}

export default EditPortfolio
