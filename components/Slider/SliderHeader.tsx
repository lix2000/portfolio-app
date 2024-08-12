'use client'
import { ReactNode, useId } from 'react'

interface ComponentsProps {
	element: ReactNode
	name: string
}

interface Props {
	components?: ComponentsProps[]
	currentChildIndex: number
	setCurrentChildIndex: (index: number) => void
	onClick?: () => void
}

const SliderBody = ({ components = [], currentChildIndex, setCurrentChildIndex, onClick }: Props) => {
	const key = useId()
	const carouselClasses = [
		'w-full',
		'transition-all',
		'duration-500',
		'h-[40px]',
		'min-h-[40px]',
		'flex-center',
		'cursor-pointer',
		'box-border',
	]
	return (
		<div className='overflow-hidden min-h-[40px] flex-center gap-0 mb-lg small-normal rounded-lg'>
			{components.map(({ name }, index) => (
				<div
					className={`${carouselClasses.join(' ')} ${
						currentChildIndex !== index
							? 'bg-primary text-white border-primary'
							: 'hover:text-black bg-gray-200'
					}`}
					onClick={() => {
						setCurrentChildIndex(index)
						onClick && onClick()
					}}
					key={key + index}
				>
					{name}
				</div>
			))}
		</div>
	)
}

export default SliderBody
