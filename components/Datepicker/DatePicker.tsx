'use client'
import { useClickedOutside, useToggle } from '@hooks'
import DatePickerInput from './DatePickerInput'
import { useController } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'

interface Props {
	value?: Date | null | [Date | null, Date | null]
	onChange?: (dates: [Date | null, Date | null]) => void
	name: string
	label?: string
	placeholder?: string
}

const DatePickerForm = ({ value, onChange, name, placeholder, label, ...rest }: Props) => {
	const { field, fieldState } = useController({ name })

	const [isOpen, toggle] = useToggle()
	const { componentRef } = useClickedOutside(toggle, !!isOpen)

	const handleOnSelect = (d: Date | null) => {
		field.onChange(d)
		toggle()
	}

	const handleClearValue = (e: any) => {
		e.stopPropagation()
		e.preventDefault()
		field.onChange(null)
	}

	return (
		<div className='min-w-[350px] w-full relative' ref={componentRef}>
			<DatePicker
				selected={field.value}
				onChange={handleOnSelect}
				open={!!isOpen}
				showPopperArrow={false}
				popperPlacement='bottom'
				minDate={new Date()}
				{...rest}
				customInput={
					<DatePickerInput
						{...{
							onChange: field.onChange,
							toggleDropdown: toggle,
							label,
							error: fieldState.error?.message,
							value: field.value,
							placeholder,
						}}
					/>
				}
			/>
			{field.value && <button onClick={handleClearValue} className='calendar-input-clear' />}
		</div>
	)
}

export default DatePickerForm
