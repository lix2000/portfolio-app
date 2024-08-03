'use client'
import { Title, Form, Input, Button, TextArea, CheckBox, DatePicker, Radio, ContactForm } from '@components'
import { footerBlackList, footerContactIcons, serviceTypes } from '@lib/settings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContactType, ContactZodSchema } from '@types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Footer = () => {
	const pathName = usePathname()
	const onSubmit = (data: ContactType) => {
		console.log(data)
	}

	if (footerBlackList.some(item => pathName.includes(item))) return null

	return (
		<>
			<Title>Contact Us</Title>
			<div className='w-full py-10 bg-tertiary-10 flex-center flex-col gap-6'>
				<ContactForm onSubmit={onSubmit} />
				<div className='flex-center gap-2'>
					{footerContactIcons.map(({ icon, href }) => (
						<Link
							rel='noopener noreferrer '
							target='_blank'
							href={href}
							className='rounded-full transition-all p-2 duration-500 flex-center bg-primary hover:bg-tertiary hover:text-primary border-2 border-primary text-primary-contrast'
						>
							<FontAwesomeIcon style={{ width: '20px', height: '20px' }} icon={icon} />
						</Link>
					))}
				</div>
			</div>
			<div className='w-full h-[80px] flex-center gap-4 bg-tertiary-20'>
				<Link
					rel='noopener noreferrer'
					target='_blank'
					href='https://cshgreenwichadvisory.com/merchant-policies'
				>
					Merchant Policies{' '}
				</Link>
				|
				<Link rel='noopener noreferrer' target='_blank' href='https://cshgreenwichadvisory.com/legal-notice'>
					Legal Notice{' '}
				</Link>
			</div>
		</>
	)
}

export default Footer
