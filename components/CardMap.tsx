import { PropsWithChildren } from 'react'
import EmptyState from './EmptyState'
import Button from './Button'
import Loader from './Loader'

interface Props {
	fetchNextPage?: () => void
	hasNextPage?: boolean
	disabledFetchNextPage?: boolean
	className?: string
	isLoading?: boolean
	children?: React.ReactNode[]
}
const CardMap = ({
	children = [],
	fetchNextPage,
	hasNextPage,
	disabledFetchNextPage,
	isLoading,
}: PropsWithChildren<Props>) => {
	console.log(children, 'children')
	if (isLoading)
		return (
			<div className='w-full h-full flex-center'>
				<Loader key='table-loader' size='3x' />
			</div>
		)

	if (!children || children.length === 0)
		return (
			<div className='w-full h-full flex-center'>
				<EmptyState />
			</div>
		)

	return (
		<div className='w-full h-full gap-[30px] flex flex-col items-center justify-center'>
			<div className='flex flex-col gap-8 items-center'>{children}</div>
			{hasNextPage && fetchNextPage && (
				<div className='flex-center mt-[20px]'>
					<Button disabled={disabledFetchNextPage} onClick={() => fetchNextPage()}>
						Load More...
					</Button>
				</div>
			)}
		</div>
	)
}

export default CardMap
