'use client'
import { navbarBlackList, navbarTabs, theDesignerContactIcons } from '@settings'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useShowInfoNavbar, useToggle } from '@hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const theme = {
	true: {
		navbarClassnames: ['bg-tertiary-shadow', 'h-[120px]'],
		menuIconClassnames: ['text-tertiary-tone'],
	},
	false: {
		navbarClassnames: ['bg-tertiary', 'h-[60px]'],
		menuIconClassnames: ['text-primary-tone'],
	},
}

const MobileNavbar = () => {
	const pathName = usePathname()
	const [isMenuOpen, toggleMenu] = useToggle()
	const showInfo = useShowInfoNavbar()
	const { navbarClassnames: navTheme, menuIconClassnames: menuTheme } =
		theme[String(showInfo && !isMenuOpen) as keyof typeof theme]
	const buttonClassnames = ['transition-all', 'duration-500', 'cursor-pointer', 'text-tertiary-contrast']
	const navbarClassnames = ['w-full', 'h-60', 'flex-center', 'transition-all', 'duration-500', ...navTheme]
	const menuIconClassnames = ['transition-all', 'duration-500', 'cursor-pointer', ...menuTheme]
	const menuClassnames = [
		'fixed',
		'bg-tertiary',
		'z-[99]',
		'top-[60px]',
		'bottom-0',
		'left-0',
		'right-0',
		'flex',
		'flex-col',
		'justify-between',
		'items-center',
		'gap-[10px]',
		'p-[40px]',
		'text-subtitle',
	]

	if (navbarBlackList.some(item => pathName.includes(item))) return null

	return (
		<>
			<div className='fixed w-full z-[100]'>
				<div className={navbarClassnames.join(' ')}>
					<div className='min-w-[330px] flex justify-center ml-[32px]'>
						<Image
							className={`${
								!showInfo || isMenuOpen ? 'h-[44px] w-[44px]' : 'h-[80px] w-[80px]'
							} hover:ring-1 hover:ring-primary hover:ring-opacity-100 hover:rounded-full transition-all duration-500`}
							src='/images/logo.png'
							height={120}
							width={120}
							alt='logo'
						/>
					</div>
					<div className='w-[32px] flex-center'>
						<FontAwesomeIcon
							className={menuIconClassnames.join(' ')}
							onClick={toggleMenu}
							size='2xl'
							icon={isMenuOpen ? faXmark : faBars}
						/>
					</div>
				</div>
			</div>
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={menuClassnames.join(' ')}
					>
						<div className='flex flex-col items-center gap-[15px] pt-[15px]'>
							{navbarTabs.map(({ name, link }) => (
								<>
									<Link key={link} href={link}>
										<button
											onClick={toggleMenu}
											className={`${buttonClassnames.join(' ')} ${link === pathName && 'font-semibold'}`}
										>
											{name}
										</button>
									</Link>
									<div className='w-[30px] h-[1px] bg-primary' />
								</>
							))}
						</div>
						<div className='flex gap-2 flex-center'>
							{theDesignerContactIcons.map(({ icon, href }) => (
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
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default MobileNavbar
