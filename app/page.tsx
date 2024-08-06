'use client'

import { AboutUsCard, ReasonCard, Title } from '@components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import { homepageReasonIcons } from '@lib/settings'
import Services from './services/page'
import Image from 'next/image'
import { useAboutUses } from '@hooks'

const Home = () => {
	const { data } = useAboutUses()
	const aboutUs = data?.pages.flatMap(page => page.data) ?? []

	return (
		<div className='flex column flex-col min-h-full min-w-full'>
			<div className='w-full h-[666px] relative'>
				<img
					alt='aaaa'
					src='/images/homeBackground.jpeg'
					className='w-full h-full object-cover absolute inset-0 -z-10 filter brightness-50'
				/>
			</div>
			<Title>Who We Are</Title>
			<div className='flex flex-col gap-8 p-[58px] items-center'>
				{aboutUs?.map((item, index) => <AboutUsCard key={index} aboutUs={item} />)}
			</div>
			<Services />
			<Title>Why Choose Us?</Title>
			<div className='flex flex-col gap-8 p-[58px] items-center'>
				{homepageReasonIcons.map((item, index) => (
					<ReasonCard key={index} {...item} />
				))}
			</div>
			<div className='w-full text-title flex justify-center items-center mb-[58px] gap-2'>
				Spoken Languages:
				<Image src='/images/english.png' alt='flag' width={24} height={24} />
				English
				<Image src='/images/french.png' alt='flag' width={24} height={24} />
				French
			</div>
			<div className='w-full h-[280px] bg-tertiary-10 flex-center'>
				<div className='w-[650px] h-[168px] flex bg-primary rounded-lg shadow-lg'>
					<div className='w-[78px] h-[108px] bg-secondary mx-10 flex-center relative before:content-[""] before:w-0 before:h-0 before:absolute before:bottom-0 before:left-0 before:right-0 border-l-[50px] border-l-transparent border-b-[35px] border-primary border-r-[50px] border-r-transparent'>
						<FontAwesomeIcon className='text-secondary-contrast' size='2x' icon={faAward} />
					</div>
					<div className='text-tertiary pt-6 pr-6'>
						<div className='text-title pb-4'>Initial Consultation</div>
						{/* <link className='text-subtitle'> */}
						Complimentary 30-min Initial Phone Consultation with all services
						{/* </link> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
