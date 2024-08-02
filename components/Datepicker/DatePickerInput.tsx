'use client'
import Error from '@components/Error'
import { forwardRef } from 'react'

interface Props {
	toggleDropdown?: () => void
	label?: string
	error?: string
	value: string | undefined
	placeholder?: string
}

const DatePickerInput = (
	{ error, value, toggleDropdown, label, placeholder = 'Select Date' }: Props,
	ref: any
) => {
	const classes = [
		'w-full',
		'rounded-2xl',
		'p-2',
		'border',
		'border-tertiary-tone-25',
		'focus:outline-none',
		'h-[40px]',
		'transition-all',
		'duration-500',
		'relative',
	] as string[]

	return (
		<div className='flex w-full flex-col gap-1 flex-1 relative !bg-red' onClick={toggleDropdown} ref={ref}>
			{label && <label className='text-label'>{label}</label>}
			<input className={classes.join(' ')} value={value} placeholder={placeholder}></input>
			{error && <Error>{error}</Error>}
		</div>
	)
}

export default forwardRef(DatePickerInput)
