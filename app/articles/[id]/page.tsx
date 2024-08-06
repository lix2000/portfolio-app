'use client'
import { Carousel, DangerousHtml, Title } from '@components'
import { useArticle } from '@hooks'

type Props = {
	params: {
		id: string
	}
}

const Article = ({ params: { id } }: Props) => {
	const { data } = useArticle(id) ?? {}
	const { description = '', images, title } = data ?? {}

	return (
		<div className='w-full max-w-full min-h-full items-center pt-[60px] flex box-border flex-col'>
			<Title>{title}</Title>
			<div className='w-full gap-4 py-[50px] max-w-[1200px] px-[30px] box-border float-left'>
				<div className='w-[400px] h-[290px] border p-[10px] rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group float-start mr-[20px]'>
					<Carousel images={images?.map(image => image.url)} />
				</div>
				{DangerousHtml(description)}
			</div>
		</div>
	)
}

export default Article
