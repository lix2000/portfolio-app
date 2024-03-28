'use client'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useShowInfoNavbar = () => {
	const pathName = usePathname()
	const isHomePage = pathName === '/'
	const [showInfo, setShowInfo] = useState<boolean>(isHomePage && window?.scrollY < 120)
	const calculateShowInfo = useCallback(() => {
		setShowInfo(isHomePage && window.scrollY < 120)
	}, [isHomePage])

	useEffect(() => {
		if (!isHomePage) return
		window.addEventListener('scroll', calculateShowInfo)
		return () => {
			window.removeEventListener('scroll', calculateShowInfo)
		}
	}, [isHomePage])

	useEffect(() => {
		calculateShowInfo()
	}, [isHomePage])

	return showInfo
}
