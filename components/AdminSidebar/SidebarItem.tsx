'use client'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarItemProps {
	name: string
	path: string
	icon: any
}

interface Props {
	name: string
	path: string
	icon: any
	subitems?: NavbarItemProps[]
}

const SidebarItem = ({ name, path, icon, subitems }: Props) => {
	const pathname = usePathname()
	const isActive = pathname === path || (subitems?.some(item => item.path === pathname) && subitems?.length)
	const areSubitemsActive = isActive && subitems?.length
	const classes = [
		'relative',
		'w-full',
		'min-h-10',
		'flex',
		'items-center',
		'gap-[20px]',
		'px-4',
		'py-1',
		'base-normal',
		areSubitemsActive ? 'rounded-t-lg' : 'rounded-lg',
		'group',
		'hover:bg-primary-5',
	]
	const activeStyles = ['bg-tertiary', 'text-tertiary-contrast', 'hover:bg-tertiary', 'hover:text-primary']
	const pseudoClasses = [
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
	if (isActive) classes.push(...pseudoClasses, ...activeStyles)

	const subitemClasses = ['rounded-t-none', 'last:rounded-b-lg', '!px-[56px]']

	return (
		<div key={path} className={isActive ? '-mr-4' : ''}>
			<Link href={path} className={classes.join(' ')}>
				<FontAwesomeIcon icon={icon} />
				<div className='grow'>{name}</div>
				{subitems && <FontAwesomeIcon icon={areSubitemsActive ? faAngleUp : faAngleDown} />}
			</Link>
			{areSubitemsActive && (
				<div>
					{subitems.map(({ name, path, icon }, index) => (
						<Link
							href={path}
							key={path + index}
							className={`${classes.join(' ')} ${subitemClasses.join(' ')} ${path === pathname ? '!text-primary' : ''}`}
						>
							<FontAwesomeIcon icon={icon} />
							{name}
						</Link>
					))}
				</div>
			)}
		</div>
	)
}

export default SidebarItem
