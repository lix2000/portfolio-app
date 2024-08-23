'use client'
import { ContactForm, Title } from '@components'
import { footerBlackList, footerContactIcons } from '@lib/settings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useCreateRequest } from '@hooks'

const Footer = () => {
	const pathName = usePathname()
	const mutation = useCreateRequest()

	if (footerBlackList.some(item => pathName.includes(item))) return null

	return (
		<>
			<Title>Get In Touch</Title>
			<div className='w-full py-10 bg-tertiary-10 flex-center flex-col gap-6'>
				<div className='min-w-[350px] max-w-[650px] w-full bg-tertiary p-6 rounded-lg shadow-card hover:shadow-2xl'>
					<ContactForm onSubmit={mutation.mutateAsync} />
				</div>
				<div className='flex-center gap-2'>
					{footerContactIcons.map(({ icon, href }) => (
						<Link
							key={href}
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
