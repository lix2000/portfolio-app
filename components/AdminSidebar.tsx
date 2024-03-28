import { faBriefcase, faGauge, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

const adminSidebarItems = [
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

const AdminSidebar = ({}) => {
	return (
		<div className='w-1/6 bg-primary text-primary-contrast flex flex-col items-center gap-4 p-4'>
			<Link href='/'>
				<Image
					className='ring-1 ring-primary rounded-full'
					src='/images/logo.png'
					height={60}
					width={60}
					alt='logo'
				/>
			</Link>
			<ul className='w-full flex flex-col gap-1'>
				{adminSidebarItems.map(({ name, path, icon }) => (
					<li key={path} className='rounded w-full py-1 px-2 hover:bg-primary-5 cursor-pointer'>
						<FontAwesomeIcon icon={icon} className='mr-2' />
						<Link href={path}>{name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default AdminSidebar
