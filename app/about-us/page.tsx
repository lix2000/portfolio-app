'use client'

import { AboutUsCard, Title } from '@components'
import { useAboutUses } from '@hooks'
import { useRouter } from 'next/navigation'

const AboutUses = () => {
	const { data } = useAboutUses()
	const aboutUs = data?.pages.flatMap(page => page.data) ?? []
	const router = useRouter()

	const goToService = (id: string) => router.push(`/about-us/${id}`)

	return (
		<>
			<Title>Who We Are</Title>
			<div className='flex flex-col gap-8 p-[58px] items-center'>
				{aboutUs?.map((item, index) => <AboutUsCard key={index} aboutUs={item} onClick={goToService} />)}
			</div>
		</>
	)
}

export default AboutUses
