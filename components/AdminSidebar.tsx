'use client'
import { faArrowRightFromBracket, faBriefcase, faGauge, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@components'
import { signOut } from 'next-auth/react'

interface AdminSidebarItem {
	name: string
	path: string
	icon: any
}

const adminSidebarItems: AdminSidebarItem[] = [
	{
		name: 'Dashboard',
		path: '/admin',
		icon: faGauge,
	},
	{
		name: 'Services',
		path: '/admin/services',
		icon: faListCheck,
	},
	{
		name: 'Portfolio',
		path: '/admin/portfolio',
		icon: faBriefcase,
	},
]

const AdminSidebar = () => {
	const activeTab = usePathname()

	const tabStyles = [
		'rounded-xl',
		'min-w-full',
		'h-10',
		'py-1',
		'px-4',
		'flex',
		'items-center',
		'hover:bg-primary-5',
		'cursor-pointer',
	]

	const activeTabStyles = [
		'relative',
		'-mr-4',
		'rounded-r-none',
		'bg-tertiary',
		'text-tertiary-contrast',
		'hover:bg-tertiary',
		'hover:text-primary',
		'before:content-[""]',
		'before:w-5',
		'before:h-5',
		'before:bg-tertiary',
		'before:absolute',
		'before:-top-5',
		'before:right-0',
		'before:rounded-br-2xl',
		'before:bg-transparent',
		'before:shadow-sidebar-pseudo-t',
		'after:content-[""]',
		'after:w-5',
		'after:h-5',
		'after:bg-tertiary',
		'after:absolute',
		'after:-bottom-5',
		'after:right-0',
		'after:rounded-tr-2xl',
		'after:bg-transparent',
		'after:shadow-sidebar-pseudo-b',
	]

	return (
		<div className='w-[200px] bg-primary text-primary-contrast flex flex-col items-center flex-grow-0 flex-shrink-0 gap-4 py-4'>
			<Link href='/'>
				<Image
					className='ring-1 ring-primary rounded-full'
					src='/images/logo.png'
					height={60}
					width={60}
					alt='logo'
					priority
				/>
			</Link>
			<ul className='w-full flex flex-col gap-1 px-4 flex-1'>
				{adminSidebarItems.map(({ name, path, icon }) => (
					<Link key={path} href={path}>
						<li className={[...tabStyles, ...(activeTab === path ? activeTabStyles : [])].join(' ')}>
							<FontAwesomeIcon icon={icon} className='mr-2' />
							{name}
						</li>
					</Link>
				))}
			</ul>
			<Button className='self-stretch mx-4' theme='tertiary' onClick={() => signOut()}>
				<FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-2' />
				Log out
			</Button>
		</div>
	)
}

export default AdminSidebar
