'use client'
import { AboutUsCard, CardGrid, CardMap, Title } from '@components'
import { useAboutUses, useIsMobile } from '@hooks'
import { useRouter } from 'next/navigation'

const AboutUses = () => {
	const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } = useAboutUses()
	const aboutUs = data?.pages.flatMap(page => page.data) ?? []
	const disabledFetchNextPage = isLoading || isFetchingNextPage
	const router = useRouter()
	const isMobile = useIsMobile()

	const goToAbout = (id: string) => router.push(`/about-us/${id}`)

	return (
		<>
			<Title>Who We Are</Title>
			<div className='flex flex-col gap-8 px-[58px] pt-[58px] items-center'>
				{!isMobile && (
					<CardMap
						{...{
							onClick: goToAbout,
							fetchNextPage,
							hasNextPage,
							disabledFetchNextPage,
							isLoading,
						}}
					>
						{aboutUs?.map((item, index) => <AboutUsCard key={index} aboutUs={item} onClick={goToAbout} />)}
					</CardMap>
				)}
				{isMobile && (
					<CardGrid
						{...{
							data: aboutUs,
							onClick: goToAbout,
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

export default AboutUses
