'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useController } from 'react-hook-form'
import { Error } from '@components'

const StarRatingInput = ({ name }: { name: string }) => {
	const { field, fieldState } = useController({
		name,
	})

	const handleClick = (value: number) => field.onChange(value)

	return (
		<div>
			<div className='flex items-center gap-2'>
				{[...Array(5)].map((_, i) => (
					<FontAwesomeIcon
						key={i}
						icon={faStar}
						size='lg'
						className={`cursor-pointer ${i < field.value ? 'text-primary' : 'text-gray-300'}`}
						onClick={() => handleClick(i + 1)}
					/>
				))}
			</div>
			{fieldState.error && <Error>{fieldState.error.message}</Error>}
		</div>
	)
}

export default StarRatingInput
