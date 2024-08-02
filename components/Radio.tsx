import { useController } from 'react-hook-form'
import Error from './Error'

type option = {
	label: string
	value: string
}

export type RadioProps = {
	name: string
	label: string
	options: option[]
}

const Radio = ({ name, label, options }: RadioProps) => {
	const { field, fieldState } = useController({ name })
	const error = fieldState.error?.message

	return (
		<div className='space-y-2'>
			<label className='block text-sm font-medium leading-tight text-tertiary-contrast'>{label}</label>
			<div className='grid grid-cols-2 gap-4'>
				{options.map(option => (
					<div key={option.value} className='flex items-center'>
						<input
							type='radio'
							{...field}
							value={option.value}
							className='form-radio h-4 w-4 text-primary focus:ring-primary-500'
						/>
						<label
							htmlFor={option.value}
							className='ml-2 text-sm font-medium leading-none text-tertiary-contrast'
						>
							{option.label}
						</label>
					</div>
				))}
			</div>
			{error && <Error>{error}</Error>}
		</div>
	)
}

export default Radio
