'use client'
import { useState, useCallback, useLayoutEffect } from 'react'

export const useIsMobile = (maxWidth: number = 700) => {
	const [isMobile, setIsMobile] = useState(() => {
		if (typeof window !== 'undefined') return window.innerWidth <= maxWidth
	})

	const handleResize = useCallback(() => {
		setIsMobile(window.innerWidth <= maxWidth)
	}, [maxWidth])

	useLayoutEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [handleResize])

	return isMobile
}
