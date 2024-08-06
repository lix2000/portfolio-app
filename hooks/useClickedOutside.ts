'use client'
import { useCallback, useEffect, useRef } from 'react'

export const useClickedOutside = (close: () => void, isOpen: boolean) => {
	const componentRef = useRef<HTMLDivElement>(null)
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (componentRef.current && !componentRef.current.contains(event.target as Node)) close()
		},
		[close]
	)

	useEffect(() => {
		if (!isOpen) return
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, handleClickOutside])

	return { componentRef }
}
