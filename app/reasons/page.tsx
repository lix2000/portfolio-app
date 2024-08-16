import { CardGrid, CardMap, ReasonCard, Title } from '@components'
import { useIsMobile } from '@hooks'
import { homepageReasonIcons } from '@lib/settings'

const Reasons = () => {
	const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } = {
		data: { pages: [{ data: homepageReasonIcons }] },
		fetchNextPage: () => {},
		isLoading: false,
		isFetchingNextPage: false,
		hasNextPage: false,
	} // to do remove this when reason api is ready
	const reasons = data?.pages.flatMap(page => page.data) ?? []
	const disabledFetchNextPage = isLoading || isFetchingNextPage
	const isMobile = useIsMobile()

	return (
		<>
			<Title>Why Choose Us?</Title>
			<div className='flex flex-col gap-8 px-[58px] pt-[58px] items-center'>
				{!isMobile && (
					<CardMap
						{...{
							fetchNextPage,
							hasNextPage,
							disabledFetchNextPage,
							isLoading,
						}}
					>
						{reasons?.map((item, index) => <ReasonCard key={index} {...item} />)}
					</CardMap>
				)}
				{isMobile && (
					<CardGrid
						{...{
							data: reasons,
							onClick: () => {},
							fetchNextPage,
							hasNextPage,
							disabledFetchNextPage,
							isLoading,
						}}
					/>
				)}
			</div>
		</>
	)
}

export default Reasons
