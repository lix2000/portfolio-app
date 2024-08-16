'use client'
import { SelectHTMLAttributes } from 'react'
import { Path, useController } from 'react-hook-form'
import { Error } from '@components'

const Select = <T extends unknown>({
	name,
	label,
	options,
	placeholder = '',
	className = '',
	...props
}: {
	name: Path<T>
	label?: string
	options?: { label: any; value: any }[]
	placeholder?: string
	className?: string
} & SelectHTMLAttributes<HTMLSelectElement>) => {
	const { field, fieldState } = useController({ name })

	const classes = [
		'min-w-[200px]',
		'w-full',
		'rounded-2xl',
		'p-2',
		'border',
		'border-tertiary-tone-25',
		'focus:outline-none',
		'transition-colors',
		'h-[40px]',
		'duration-500',
		'relative',
		'appearance-none',
		fieldState.invalid ? 'border-red-500' : 'focus:border-primary',
	] as string[]
	if (className) classes.push(className)

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => field.onChange(event.target.value)

	return (
		<div className='flex flex-col gap-1 flex-1'>
			{label && <label className='text-label'>{label}</label>}
			<div className='relative'>
				<select
					{...props}
					key={field.value}
					value={field.value ?? ''}
					onChange={onChange}
					className={classes.join(' ')}
				>
					<option selected disabled hidden value=''></option>
					{options?.map(option => (
						<option key={option?.value} value={option?.value}>
							{option?.label}
						</option>
					))}
				</select>
				{!field.value && (
					<span className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-400'>{placeholder}</span>
				)}
			</div>
			{fieldState.invalid && <Error>{fieldState.error?.message}</Error>}
		</div>
	)
}

export default Select
