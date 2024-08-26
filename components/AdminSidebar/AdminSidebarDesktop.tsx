'use client'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@components'
import { signOut } from 'next-auth/react'
import SidebarItem from './SidebarItem'
import { adminSidebarItems } from '@lib/settings'

const AdminSidebarDesktop = () => {
	return (
		<div className='h-full w-[250px] min-w-[250px] bg-primary text-primary-contrast py-4 flex flex-col items-center flex-grow-0 flex-shrink-0 gap-4'>
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
			<section className='block flex-1 w-full flex-column px-4'>{adminSidebarItems.map(SidebarItem)}</section>
			<Button className='self-stretch mx-4' theme='tertiary' onClick={() => signOut()}>
				<FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-2' />
				Log out
			</Button>
		</div>
	)
}

export default AdminSidebarDesktop
