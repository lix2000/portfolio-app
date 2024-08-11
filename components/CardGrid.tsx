import Button from './Button'
import Card from './Card'
import EmptyState from './EmptyState'
import Grid from './Grid'
import Loader from './Loader'

interface Props {
	data: any[]
	onClick: (id: string) => void
	fetchNextPage?: () => void
	hasNextPage?: boolean
	disabledFetchNextPage?: boolean
	className?: string
	isLoading?: boolean
}

const CardGrid = ({
	data,
	onClick,
	fetchNextPage,
	hasNextPage,
	disabledFetchNextPage,
	className,
	isLoading,
}: Props) => {
	if (isLoading)
		return (
			<div className='w-full h-full flex-center  min-h-[700px] pb-[30px]'>
				<Loader key='table-loader' size='3x' />
			</div>
		)

	if (data.length === 0)
		return (
			<div className='w-full h-full  min-h-[700px] flex-center pb-[30px]'>
				<EmptyState />
			</div>
		)

	return (
		<div className='w-full h-full min-h-[700px] gap-[30px] pb-[30px] flex flex-col items-center justify-center'>
			<Grid className={className}>
				{data.map((item, index) => (
					<Card
						key={item?._id as string}
						{...{
							label: 'Learn More',
							...item,
							onClick: () => onClick(item?._id as string),
							delay: index * 1000,
						}}
					/>
				))}
			</Grid>
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

export default CardGrid
