'use client'
import { CardGrid, Title } from '@components'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolios } from '@hooks'

const Portfolio = () => {
	const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = usePortfolios()
	const disableFetchNext = isLoading || isFetchingNextPage
	const { pages = [] } = data || {}
	const allPortfolios = pages.flatMap(page => page.data)

	const router = useRouter()

	const goToPortfolio = useCallback(
		(id: string) => {
			router.push(`/portfolio/${id}`)
		},
		[router]
	)

	return (
		<div className='w-full pt-[60px] flex flex-col items-center '>
			<Title>Portfolio</Title>
			<div className='w-full min-w-[310px] max-w-[1040px] pt-[30px] px-[20px]'>
				<CardGrid
					{...{
						data: allPortfolios,
						onClick: goToPortfolio,
						fetchNextPage,
						hasNextPage,
						disabledFetchNextPage: disableFetchNext,
						isLoading,
					}}
				/>
			</div>
		</div>
	)
}

export default Portfolio
