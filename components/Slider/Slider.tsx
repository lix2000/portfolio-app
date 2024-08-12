'use client'
import { useState, ReactNode, FC } from 'react'
import SliderHeader from './SliderHeader'
import SliderBody from './SliderBody'

interface ComponentsProps {
	element: ReactNode
	name: string
	onClick?: () => void
}

interface SliderProps {
	components: ComponentsProps[]
	className?: string
	initialStep?: number
	onClick?: ({ name, index }: { name: string; index: number }) => void
}

const Slider: FC<SliderProps> = ({ components = [], className, initialStep = 0, onClick }) => {
	const [currentChildIndex, setCurrentChildIndex] = useState(initialStep)
	const carouselClasses = [
		'grow',
		'h-full',
		'transition-all',
		'duration-500',
		'box-border',
		'overflow-hidden',
		'flex',
		'flex-col',
		'gap-[30px]',
	]
	if (className) carouselClasses.push(className)

	if (components.length === 0) return null
	return (
		<div className={carouselClasses.join(' ')}>
			<SliderHeader {...{ components, currentChildIndex, setCurrentChildIndex }} />
			<SliderBody {...{ components, currentChildIndex }} />
		</div>
	)
}

export default Slider
