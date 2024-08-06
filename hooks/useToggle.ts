'use client'
import { useCallback, useState } from 'react'

export const useToggle = (initialState: Boolean = false) => {
	const [state, setState] = useState<Boolean>(initialState)

	const toggle = useCallback(() => setState(prev => !prev), [])

	return [state, toggle] as const
}
