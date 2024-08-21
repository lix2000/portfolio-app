'use client'
import { DangerousHtml, EmptyState, Title } from '@components'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDesigner, useIsMobile } from '@hooks'
import Image from 'next/image'
import Link from 'next/link'

const TheDesigner = () => {
	const { data: designer } = useDesigner()
	const { name, description, image, email, phone } = designer || {}
	const isMobile = useIsMobile()
	const classes = [
		'w-fill',
		'min-h-full',
		'gap-[50px]',
		'w-full',
		'py-[30px]',
		isMobile ? 'flex flex-col justify-center items-center px-[30px]' : 'flex-center px-[50px]',
	]
	const descriptionClasses = [isMobile ? 'text-center' : 'text-start']
	const imageCLasses = [
		'max-w-[300px]',
		'min-w-[300px]',
		'max-h-[300px]',
		'min-h-[300px]',
		'bg-red',
		'overflow-hidden',
		'rounded-full',
	]

	if (!designer)
		return (
			<div className='w-full h-full  flex-center pb-[30px]'>
				<EmptyState />
			</div>
		)

	return (
		<div className='w-full pt-[60px] flex flex-col items-center'>
			<Title>Designer & Founder</Title>
			<div className={classes.join(' ')}>
				<div className={imageCLasses.join(' ')}>
					<Image
						className='hover:scale-110 transition-all duration-500 object-fill'
						src={image?.url || ''}
						height={300}
						width={300}
						alt='logo'
					/>
				</div>
				<div
					className={`w-fit flex flex-col gap-[30px] max-w-[700px] ${isMobile ? 'text-center' : 'text-start'}`}
				>
					<div className='text-title text-tertiary-contrast-20'>{name}</div>
					<div className={`flex gap-2 ${isMobile ? 'flex-center' : 'flex'}`}>
						<Link
							rel='noopener noreferrer '
							target='_blank'
							href={`mailto:${email}`}
							className='rounded-full transition-all p-2 duration-500 flex-center bg-primary hover:bg-tertiary hover:text-primary border-2 border-primary text-primary-contrast'
						>
							<FontAwesomeIcon style={{ width: '20px', height: '20px' }} icon={faEnvelope} />
						</Link>
						<Link
							rel='noopener noreferrer '
							target='_blank'
							href={`tel:${phone}`}
							className='rounded-full transition-all p-2 duration-500 flex-center bg-primary hover:bg-tertiary hover:text-primary border-2 border-primary text-primary-contrast'
						>
							<FontAwesomeIcon style={{ width: '20px', height: '20px' }} icon={faPhone} />
						</Link>
					</div>
					<div className={descriptionClasses.join(' ')}>{DangerousHtml(description)}</div>
				</div>
			</div>
		</div>
	)
}

export default TheDesigner
