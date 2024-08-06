'use client'
import { usePathname } from 'next/navigation'
import { useCallback, useLayoutEffect, useState } from 'react'

export const useShowInfoNavbar = () => {
	const pathName = usePathname()
	const isHomePage = pathName === '/'
	const [showInfo, setShowInfo] = useState<boolean>(true)
	const calculateShowInfo = useCallback(() => {
		setShowInfo(isHomePage && window.scrollY < 120)
	}, [isHomePage])

	useLayoutEffect(() => {
		calculateShowInfo()
		if (!isHomePage) return
		window.addEventListener('scroll', calculateShowInfo)
		return () => {
			window.removeEventListener('scroll', calculateShowInfo)
		}
	}, [isHomePage])

	return showInfo
}
