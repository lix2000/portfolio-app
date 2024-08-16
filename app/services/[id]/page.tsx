'use client'
import { Carousel, DangerousHtml, Loader, Title } from '@components'
import { useIsMobile, useService } from '@hooks'
import { toPrice } from '@utils'

type Props = {
	params: {
		id: string
	}
}

const Service = ({ params: { id } }: Props) => {
	const { data: service, isLoading } = useService(id) || {}
	const { title, description = '', images = [], price, priceDescription } = service || {}
	const parsedImages = images.map(image => image.url)
	const isMobile = useIsMobile()

	const photoContainerClasses = [
		'h-[290px]',
		'border',
		'p-[10px]',
		'rounded-md',
		'shadow-lg',
		'hover:shadow-2xl',
		'transition-all',
		'duration-500',
		'overflow-hidden',
		'group',
		isMobile ? 'mb-[20px] float-center w-full' : 'mr-[50px] float-start w-[400px]',
	]
	const descriptionClasses = [isMobile ? 'text-center' : 'text-start']

	if (isLoading) return <Loader />

	console.log(service, 'service')

	return (
		<div className='w-full max-w-full items-center pt-[60px] flex box-border flex-col'>
			<Title>{title}</Title>
			<div className='w-full gap-4 py-[50px] max-w-[1200px] px-[30px] box-border float-left'>
				<div className={photoContainerClasses.join(' ')}>
					<Carousel images={parsedImages} />
				</div>
				<div className={descriptionClasses.join(' ')}>{DangerousHtml(description)}</div>
				<div className='w-full flex-center mt-[40px] gap-[5px]'>
					{price && <div className='text-subtitle bold'>${toPrice(price)}</div>}
					{priceDescription && <div className='text-body'>{priceDescription}</div>}
				</div>
			</div>
		</div>
	)
}

export default Service
