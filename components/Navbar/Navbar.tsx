'use client'
import { PcNavbar, MobileNavbar } from '@components'
import { useIsMobile } from '@hooks'
import { navbarBlackList, navbarTabs } from '@lib/settings'

const Navbar = () => {
	const isMobile = useIsMobile()
	return isMobile ? <MobileNavbar navbarTabs={navbarTabs} blacklist={navbarBlackList} /> : <PcNavbar />
}

export default Navbar
