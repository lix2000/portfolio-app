'use client'
import { PcNavbar, MobileNavbar } from '@components'
import { useIsMobile } from '@hooks'

const Navbar = () => {
	const isMobile = useIsMobile()
	return isMobile ? <MobileNavbar /> : <PcNavbar />
}

export default Navbar
