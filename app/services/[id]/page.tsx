'use client'
import { Carousel, DangerousHtml, Loader, Title } from '@components'
import { useService } from '@hooks'

type Props = {
	params: {
		id: string
	}
}

const Service = ({ params: { id } }: Props) => {
	const { data: service, isLoading } = useService(id) || {}
	const { title, description = '', images = [] } = service || {}
	const parsedImages = images.map(image => image.url)

	if (isLoading) return <Loader />
	
	return (
		<div className='w-full max-w-full min-h-full items-center pt-[60px] flex box-border flex-col'>
			<Title>{title}</Title>
			<div className='w-full gap-4 py-[50px] max-w-[1200px] px-[30px] box-border float-left'>
				<div className='w-[400px] h-[290px] border p-[10px] rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group float-start mr-[20px]'>
					<Carousel images={parsedImages} />
				</div>
				{DangerousHtml(description)}
			</div>
		</div>
	)
}

export default Service
