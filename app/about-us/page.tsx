'use client'

import { AboutUsCard, Card, Title } from '@components'
import { useAboutUses, useIsMobile } from '@hooks'
import { useRouter } from 'next/navigation'

const AboutUses = () => {
	const { data } = useAboutUses()
	const aboutUs = data?.pages.flatMap(page => page.data) ?? []
	const router = useRouter()
	const isMobile = useIsMobile()

	const goToService = (id: string) => router.push(`/about-us/${id}`)

	return (
		<>
			<Title>Who We Are</Title>
			<div className='flex flex-col gap-8 p-[58px] items-center'>
				{!isMobile &&
					aboutUs?.map((item, index) => <AboutUsCard key={index} aboutUs={item} onClick={goToService} />)}
				{isMobile &&
					aboutUs?.map((item, index) => (
						<Card
							key={index}
							{...item}
							descriptionClassName='!h-[200px]'
							onClick={() => goToService(item.id)}
						/>
					))}
			</div>
		</>
	)
}

export default AboutUses
