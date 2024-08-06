'use client'
import { Carousel, DangerousHtml, Loader, Title } from '@components'
import { useAboutUs } from '@hooks'

type Props = {
	params: {
		id: string
	}
}

const AboutUs = ({ params: { id } }: Props) => {
	const { data: aboutUs, isLoading } = useAboutUs(id) || {}
	const { title, description = '', images = [] } = aboutUs || {}
	const parsedImages = images.map(image => image.url)

	if (isLoading) return <Loader />

	return (
		<div className='w-full max-w-full min-h-full items-center pt-[60px] flex box-border flex-col'>
			<Title>About Us</Title>
			<div className='w-full gap-4 py-[50px] max-w-[1200px] px-[30px] box-border float-left'>
				<div className='w-[400px] h-[290px] border p-[10px] rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group float-start mr-[20px]'>
					<Carousel images={parsedImages} />
				</div>
				<div className='text-title mb-[15px]'>{title}</div>
				{DangerousHtml(description)}
			</div>
		</div>
	)
}

export default AboutUs
