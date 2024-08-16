'use client'
import { useCallback, useState } from 'react'

export const useToggle = (initialState: boolean = false) => {
	const [state, setState] = useState<boolean>(initialState)

	const toggle = useCallback(() => setState(prev => !prev), [])

	return [state, toggle] as const
}
