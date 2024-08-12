'use client'
import { Carousel, DangerousHtml, Title } from '@components'
import { useArticle, useIsMobile } from '@hooks'

type Props = {
	params: {
		id: string
	}
}

const Article = ({ params: { id } }: Props) => {
	const { data } = useArticle(id) ?? {}
	const { description = '', images = [], title } = data ?? {}
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

	return (
		<div className='w-full max-w-full min-h-full items-center pt-[60px] flex box-border flex-col'>
			<Title>{title}</Title>
			<div className='w-full gap-4 py-[50px] max-w-[1200px] px-[30px] box-border float-left'>
				<div className={photoContainerClasses.join(' ')}>
					<Carousel images={parsedImages} />
				</div>
				<div className={descriptionClasses.join(' ')}>{DangerousHtml(description)}</div>
			</div>
		</div>
	)
}

export default Article
