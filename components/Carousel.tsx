'use client'
import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface CarouselProps {
	interval?: number
	hideDots?: boolean
	delay?: number
	children?: ReactNode[]
	images?: string[]
	hideActionButtons?: boolean
	className?: string
}

const Carousel: React.FC<CarouselProps> = ({
	interval = 5000,
	hideDots,
	delay = 0,
	children = [],
	images,
	hideActionButtons,
	className,
}) => {
	const [currentChildIndex, setCurrentChildIndex] = useState(0)
	const childrenCount = children ? React.Children.count(children) : 0
	const imagesCount = images ? images.length : 0
	const totalSlides = childrenCount || imagesCount
	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const carouselClasses = [
		'relative',
		'w-full',
		'h-full',
		'overflow-hidden',
		'transition-all',
		'duration-500',
		'rounded-md',
		'group-hover:scale-110',
	]
	if (className) carouselClasses.push(className)
	if (totalSlides < 2) {
		hideActionButtons = true
		hideDots = true
	}

	const nextSlide = () =>
		setCurrentChildIndex(prevIndex => (prevIndex == totalSlides - 1 ? 0 : prevIndex + 1))

	const prevSlide = () =>
		setCurrentChildIndex(prevIndex => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1))

	const goToSlide = (index: number) => setCurrentChildIndex(index)

	useEffect(() => {
		if (totalSlides === 2 || interval === 0) return
		const timeoutId = setTimeout(() => {
			intervalRef.current = setInterval(() => {
				nextSlide()
			}, interval)
		}, delay)

		return () => {
			if (totalSlides < 2 || interval === 0) return
			clearTimeout(timeoutId)
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [])

	return (
		<div className={carouselClasses.join(' ')}>
			{!hideActionButtons && (
				<button
					onClick={prevSlide}
					className={
						'absolute z-5 top-0 left-0 h-full z-10 w-1/6 focus:outline-none transition-opacity duration-300 hover:opacity-100 opacity-0 bg-gradient-to-l from-transparent to-white text-gray-500'
					}
				>
					<FontAwesomeIcon size='xl' icon={faAngleLeft} />
				</button>
			)}
			{!hideActionButtons && (
				<button
					onClick={nextSlide}
					className={
						'absolute z-5 top-0 right-0 h-full z-10 w-1/6 focus:outline-none transition-opacity duration-300 hover:opacity-100 opacity-0 bg-gradient-to-r from-transparent to-white text-gray-500'
					}
				>
					<FontAwesomeIcon size='xl' icon={faAngleRight} />
				</button>
			)}
			<div
				className='relative w-full h-full flex items-center transition-transform duration-1000'
				style={{ transform: `translateX(-${currentChildIndex * 100}%)` }}
			>
				{images
					? images.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={`carousel-${index}`}
								className='min-w-full w-full min-h-full h-full object-cover'
							/>
					  ))
					: children.map((child, index) => (
							<div
								className='
                  min-w-full w-full min-h-full h-full
                  object-cover flex justify-center items-center'
								key={index}
							>
								{child}
							</div>
					  ))}
			</div>
			{!hideDots && (
				<div className='absolute z-5 bottom-0 left-0 right-0 flex justify-center mb-4'>
					{Array.from({ length: totalSlides }, (_, index) => (
						<div
							key={index}
							className={`w-2 h-2 mx-1 rounded-full cursor-pointer transition-colors duration-1000 ${
								index === currentChildIndex ? 'bg-white' : 'bg-gray-500'
							}`}
							onClick={() => goToSlide(index)}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Carousel
