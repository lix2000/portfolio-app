import { Carousel, DangerousHtml, Title } from '@components'
import { articleMock } from '@lib/settings'

type Props = {
	params: {
		id: string
	}
}

const Article = ({ params: { id } }: Props) => {
	//to do remove this when api is ready
	const {
		longDescription = '',
		description = '',
		images,
		title,
	} = articleMock.find(portfolio => portfolio.id === id) || {}

	return (
		<div className='w-full max-w-full min-h-full items-center pt-[60px] flex box-border flex-col'>
			<Title>{title}</Title>
			<div className='w-full gap-4 py-[50px] max-w-[1200px] px-[30px] box-border float-left'>
			<div className='w-[400px] h-[290px] border p-[10px] rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group float-start mr-[20px]' >
			<Carousel images={images} />
			</div>
				{DangerousHtml(description)}
				<br/>
				{DangerousHtml(longDescription)}
			</div>
		</div>
	)
}

export default Article
