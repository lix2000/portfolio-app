'use client'
import { Antic_Didone } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import AboutUses from './about-us/page'
import Services from './services/page'
import Image from 'next/image'
import Reviews from './reviews/page'
import { useIsMobile } from '@hooks'
import Reasons from './reasons/page'

const anticDidone = Antic_Didone({ weight: '400', subsets: ['latin'] })

const Home = () => {
	const isMobile = useIsMobile()

	return (
		<div className='flex column flex-col min-h-full min-w-full'>
			<div className={`w-full h-[666px] relative ${anticDidone.className}`}>
				<Image
					alt='homeBackground'
					src='/images/homeBackground.jpeg'
					className='w-full h-full object-cover absolute inset-0 -z-10 filter brightness-50'
					width={0}
					height={0}
					sizes='100vw'
					style={{ width: '100%', height: '100%' }}
				/>
				<div className='w-full h-full flex-center flex-col text-primary-contrast'>
					{!isMobile && (
						<Image
							className='ring-1 ring-primary rounded-full'
							src='/images/logo.png'
							height={140}
							width={140}
							alt='logo'
						/>
					)}
					<p className='text-title-mega text-center'>CSH Greenwich Advisory</p>
					<div className={`text-title-xl text-center flex ${isMobile && 'flex-col items-center'}`}>
						<div className={`w-fit ${!isMobile && 'px-[20px] border-r border-white'}`}>Interior Design</div>
						<div className={`w-fit ${!isMobile && 'px-[20px] border-r border-white'}`}>
							Project Management
						</div>
						<div className='px-[20px]'>Real Estate </div>
					</div>
				</div>
			</div>
			<AboutUses />
			<Services />
			{/* <Title>Why Choose Us?</Title>
			<div className='flex flex-col gap-8 p-[58px] items-center'>
				{!isMobile && homepageReasonIcons.map((item, index) => <ReasonCard key={index} {...item} />)}
				{isMobile &&
					homepageReasonIcons.map((item, index) => (
						<Card key={index} descriptionClassName='!h-fit' {...item} />
					))}
			</div> */}
			<Reasons />
			<div className='w-full text-title flex flex-col gap-2 pt-[60px]'>
				<div className='text-center w-full'>Spoken Languages:</div>
				<div className='flex justify-center items-center gap-4'>
					<div className='flex-center gap-2'>
						<Image src='/images/english.png' alt='flag' width={24} height={24} />
						English
					</div>
					<div className='flex-center gap-2'>
						<Image src='/images/french.png' alt='flag' width={24} height={24} />
						French
					</div>
				</div>
			</div>
			<Reviews />
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
