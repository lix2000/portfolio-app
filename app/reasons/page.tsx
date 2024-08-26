'use client'
import { CardGrid, CardMap, ReasonCard, Title } from '@components'
import { useIsMobile } from '@hooks'
import { homepageReasonIcons } from '@lib/settings'

const Reasons = () => {
	const isMobile = useIsMobile()

	return (
		<>
			<Title>Why Choose Us?</Title>
			<div className='flex flex-col gap-8 px-[58px] pt-[58px] items-center'>
				{!isMobile && (
					<CardMap>{homepageReasonIcons?.map((item, index) => <ReasonCard key={index} {...item} />)}</CardMap>
				)}
				{isMobile && (
					<CardGrid
						{...{
							data: homepageReasonIcons,
							onClick: () => {},
						}}
					/>
				)}
			</div>
		</>
	)
}

export default Reasons
