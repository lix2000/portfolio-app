import { Button, Carousel } from '@components'
import { ServerServiceType } from '@types'

interface Props extends ServerServiceType {
	delay?: number
	onReadMoreClick?: () => void
	price?: number | string
	images:  { url: string; id: string }[]
	title: string
	description?: string
}
const Card = ({ title, description, images, delay, price, onReadMoreClick }: Props) => {
	const imageURLs = images.map(image => image.url)

	return (
		<div className='flex flex-col max-w-[335px] minx-w-[335px] h-[470px] border-solid overflow-hidden rounded-md group shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-t from-white to-tertiary-10'>
			<div className='overflow-hidden min-w-full min-h-[220px] h-full p-2 rounded-md'>
				<Carousel images={imageURLs} delay={delay} />
			</div>
			<div className='w-full p-4 flex flex-col justify-between'>
				<div className='flex flex-col gap-4'>
					<div className='text-title text-center h-[36px] text-ellipsis ... '>{title}</div>
					{description && (
						<div className='text-header text-center text-ellipsis ... overflow-hidden h-[74px]'>
							{description}
						</div>
					)}
					{price && (
						<div className='text-header text-center text-ellipsis overflow-hidden truncate h-[26px]'>
							${price}
						</div>
					)}
				</div>
				{onReadMoreClick && (
					<div className='flex w-full'>
						<Button className='w-full' theme='tertiary' onClick={onReadMoreClick}>
							Read More
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Card
