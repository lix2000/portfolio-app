'use client'
import { navbarBlackList, navbarTabs } from '@settings'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useShowInfoNavbar } from '@hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const theme = {
	true: {
		navbarClassnames: ['bg-tertiary-shadow', 'h-[140px]'],
		buttonClassnames: ['text-tertiary-tone'],
		menuIconClassnames: ['text-tertiary-tone'],
	},
	false: {
		navbarClassnames: ['bg-tertiary', 'h-[60px]'],
		buttonClassnames: ['text-primary-tone'],
		menuIconClassnames: ['text-primary-tone'],
	},
}

const MobileNavbar = () => {
	const pathName = usePathname()
	const isHomePage = pathName === '/'
	const showInfo = useShowInfoNavbar()
	const {
		navbarClassnames: navTheme,
		buttonClassnames: btnTheme,
		menuIconClassnames: menuTheme,
	} = theme[String(showInfo) as keyof typeof theme]
	const buttonClassnames = ['transition-all', 'duration-500', 'cursor-pointer', ...btnTheme]
	const navbarClassnames = ['w-full', 'h-60', 'flex-center', 'transition-all', 'duration-500', ...navTheme]
	const menuIconClassnames = ['transition-all', 'duration-500', 'cursor-pointer', ...menuTheme]

	if (navbarBlackList.some(item => pathName.includes(item))) return null

	return (
		<div className='fixed w-full z-[100]'>
			<div className={navbarClassnames.join(' ')}>
				<div className='min-w-[330px] flex justify-center ml-[32px]'>
					<Image
						className={`${
							!showInfo ? 'h-[44px] w-[44px]' : 'h-[120px] w-[120px]'
						} hover:ring-1 hover:ring-primary hover:ring-opacity-100 hover:rounded-full transition-all duration-500`}
						src='/images/logo.png'
						height={120}
						width={120}
						alt='logo'
					/>
				</div>
				<FontAwesomeIcon
					className={menuIconClassnames.join(' ')}
					onClick={() => console.log('aaaaaaaaaaaaa')}
					size='2xl'
					icon={faBars}
				/>
			</div>
		</div>
	)
}

export default MobileNavbar
