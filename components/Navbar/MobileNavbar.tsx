'use client'
import { navbarBlackList, navbarTabs, theDesignerContactIcons } from '@settings'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useShowInfoNavbar, useToggle } from '@hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
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

const ulVariant = {
	opened: {
		transition: { delayChildren: 1, staggerChildren: 0.18 },
	},
	closed: {
		transition: { staggerChildren: 0.06, staggerDirection: -1 },
	},
}

const liVariant = {
	opened: {
		opacity: 1,
		y: '0%',
		transition: { duration: 0.65, ease: 'easeOut' },
	},
	closed: {
		opacity: 0,
		y: '100%',
		transition: { duration: 0.25, ease: 'easeInOut' },
	},
}

const mobileMenuVariant = {
	opened: {
		y: '0%',
		transition: { delay: 0.15, duration: 1.1, ease: [0.74, 0, 0.19, 1.02] },
	},
	closed: {
		y: '-100%',
		transition: { delay: 0.35, duration: 0.63, ease: [0.74, 0, 0.19, 1.02] },
	},
}

const fadeInVariant = {
	opened: {
		opacity: 1,
		transition: { delay: 1.2 },
	},
	closed: { opacity: 0 },
}

const MobileNavbar = () => {
	const pathName = usePathname()
	const [isMenuOpen, toggleMenu] = useToggle()
	const showInfo = useShowInfoNavbar()
	const { navbarClassnames: navTheme, menuIconClassnames: menuTheme } =
		theme[String(showInfo && !isMenuOpen) as keyof typeof theme]
	const buttonClassnames = [
		'transition-all',
		'duration-500',
		'cursor-pointer',
		'text-tertiary-contrast',
		'text-subtitle',
	]
	const navbarClassnames = ['w-full', 'h-60', 'flex-center', 'transition-all', 'duration-500', ...navTheme]
	const menuIconClassnames = ['transition-all', 'duration-500', 'cursor-pointer', ...menuTheme]

	if (navbarBlackList.some(item => pathName.includes(item))) return null

	return (
		<motion.nav
			initial='closed'
			animate={isMenuOpen ? 'opened' : 'closed'}
			className='w-full h-fit z-index-[100]'
		>
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
							icon={faBars}
						/>
					</div>
				</div>
			</div>
			<motion.div
				variants={mobileMenuVariant}
				className='fixed top-0 left-0 h-screen w-full flex flex-col items-center bg-white z-[500]'
			>
				<motion.div variants={fadeInVariant} className={`${navbarClassnames.join(' ')} border-b`}>
					<div className='min-w-[330px] flex justify-center ml-[32px]'>
						<Image
							className='h-[44px] w-[44px] hover:ring-1 hover:ring-primary hover:ring-opacity-100 hover:rounded-full transition-all duration-500'
							src='/images/logo.png'
							height={44}
							width={44}
							alt='logo'
						/>
					</div>
					<div className='w-[32px] flex-center'>
						<FontAwesomeIcon
							className={menuIconClassnames.join(' ')}
							onClick={toggleMenu}
							size='2xl'
							icon={faXmark}
						/>
					</div>
				</motion.div>
				<motion.ul
					variants={ulVariant}
					onClick={toggleMenu}
					className='px-[20px] py-[35px] h-full flex flex-col items-center justify-between gap-[15px] list-none w-full  box-border'
				>
					<div className='flex flex-col items-center gap-[15px]'>
						{navbarTabs.map(({ name, link }) => (
							<>
								<motion.li whileTap={{ scale: 0.95 }} key={name}>
									<motion.div variants={liVariant} className='flex flex-col items-center gap-[15px]'>
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
									</motion.div>
								</motion.li>
							</>
						))}
					</div>
					<div className='flex gap-2 flex-center'>
						{theDesignerContactIcons.map(({ icon, href }) => (
							<motion.div variants={liVariant} key={href} className='flex flex-col items-center gap-[15px]'>
								<Link
									key={href}
									rel='noopener noreferrer '
									target='_blank'
									href={href}
									className='rounded-full transition-all p-2 duration-500 flex-center bg-primary hover:bg-tertiary hover:text-primary border-2 border-primary text-primary-contrast'
								>
									<FontAwesomeIcon style={{ width: '20px', height: '20px' }} icon={icon} />
								</Link>
							</motion.div>
						))}
					</div>
				</motion.ul>
			</motion.div>
		</motion.nav>
	)
}

export default MobileNavbar
