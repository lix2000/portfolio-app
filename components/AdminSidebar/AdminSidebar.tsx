'use client'

import { useIsMobile } from '@hooks'
import AdminSidebarDesktop from './AdminSidebarDesktop'
import MobileNavbar from '@components/Navbar/MobileNavbar'
import { adminSidebarItems } from '@lib/settings'

const AdminSidebar = () => {
	const isMobile = useIsMobile()

	return isMobile ? (
		<MobileNavbar navbarTabs={adminSidebarItems} className='absolute' />
	) : (
		<AdminSidebarDesktop />
	)
}

export default AdminSidebar
