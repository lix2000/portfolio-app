'use client'
import { ReactNode, useId } from 'react'

interface ComponentsProps {
	element: ReactNode
	name?: string
}

interface Props {
	components?: ComponentsProps[]
	currentChildIndex: number
}

const SliderBody = ({ currentChildIndex, components = [] }: Props) => {
	const key = useId()
	return (
		<div
			className='w-full min-h-[calc(100%_-_56px)] max-h-[calc(100%_-_56px)] flex duration-1000 gap-[20px] box-border'
			style={{ transform: `translateX(calc(-${currentChildIndex * 100}% - ${currentChildIndex * 20}px))` }}
		>
			{components.map((child, index) => (
				<div
					className={`min-w-full w-full grow object-cover flex overflow-hidden transition-all duration-500 ${currentChildIndex === index ? 'opacity-100' : 'opacity-0'}`}
					key={key + index}
				>
					{child?.element}
				</div>
			))}
		</div>
	)
}

export default SliderBody
