import { ReactNode, forwardRef } from 'react'
import { Error } from '@components'

interface Props {
	label?: string | ReactNode
	error?: string
	placeholder?: any
}

const CheckBox = (
	{
		label,
		error,
		className,
		children,
		placeholder,
		type,
		...rest
	}: Props & React.InputHTMLAttributes<HTMLInputElement>,
	ref: React.Ref<HTMLInputElement>
) => {
	const classes = [
		'min-w-4',
		'min-h-4',
		'w-4',
		'h-4',
		'rounded-2xl',
		'focus:outline-none',
		'accent-primary',
	] as string[]
	if (className) classes.push(className)

	return (
		<div className='flex flex-col gap-1'>
			{label && <label className='text-label'>{label}</label>}
			<div className='flex items-center gap-2'>
				<input type='checkbox' ref={ref} className={classes.join(' ')} {...rest} />
				{placeholder && <div className='text-label'>{placeholder}</div>}
			</div>
			{error && <Error>{error}</Error>}
		</div>
	)
}

export default forwardRef(CheckBox)
