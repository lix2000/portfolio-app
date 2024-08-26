import { Button, Carousel, DangerousHtml } from '@components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toPrice } from '@utils'
import { UploadApiResponse } from 'cloudinary'
import Image from 'next/image'

interface Props {
	delay?: number
	onClick?: () => void
	price?: number | string
	images?: UploadApiResponse[]
	image?: string
	icon?: any
	title: string
	description?: string
	label?: string
	priceDescription?: string
	className?: string
	descriptionClassName?: string
}
const Card = ({
	title,
	description,
	images = [],
	image,
	icon,
	delay,
	price,
	priceDescription,
	onClick,
	label = 'Read More',
	className,
	descriptionClassName,
}: Props) => {
	const classes = [
		'flex',
		'flex-col',
		'max-w-[335px]',
		'min-w-[335px]',
		'border-solid',
		'overflow-hidden',
		'rounded-md',
		'group',
		'shadow-lg',
		'hover:shadow-2xl',
		'transition-all',
		'duration-500',
		'bg-gradient-to-t',
		'from-white',
		'to-gray-200',
		className,
	]
	const imageURLs = images.map(image => image.url)

	return (
		<div className={classes.join(' ')}>
			{!icon && !image && (
				<div className='overflow-hidden min-w-full flex-center min-h-[220px] h-full p-2 rounded-md'>
					<Carousel images={imageURLs} delay={delay} />
				</div>
			)}
			{icon && (
				<div className='overflow-hidden min-w-full flex-center min-h-[120px] h-full p-2 rounded-md'>
					<FontAwesomeIcon className='text-primary' size='5x' icon={icon} />
				</div>
			)}
			{image && (
				<div className='overflow-hidden w-full flex-center'>
					<Image
						src={image}
						alt={title}
						width={0}
						height={0}
						sizes='100vw'
						className='object-contain'
						style={{ width: '100%', height: '100%' }}
					/>
				</div>
			)}
			<div className='w-full p-4 flex flex-col justify-between'>
				<div className='flex flex-col gap-4'>
					<div className='text-title text-center min-h-[36px] text-ellipsis ... '>{title}</div>
					{description && (
						<div className={`text-body text-center ... overflow-hidden h-[74px] ${descriptionClassName}`}>
							{DangerousHtml(description)}
						</div>
					)}
					{price && (
						<div className='text-header text-center text-ellipsis overflow-hidden truncate h-[26px]'>
							{`$${toPrice(price)} ${priceDescription && priceDescription}`}
						</div>
					)}
					{onClick && (
						<div className='flex w-full'>
							<Button className='w-full' onClick={onClick}>
								{label}
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Card
