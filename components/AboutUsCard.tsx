import { Carousel, DangerousHtml } from '@components'
import Button from './Button'
import { ServerAboutUsType } from '@types'

interface Props {
	delay?: number
	aboutUs: ServerAboutUsType
	onClick: (id: string) => void
}

const AboutUsCard = ({ aboutUs, delay, onClick }: Props) => {
	const { title, description, images, _id = '' } = aboutUs || {}

	return (
		<div className='flex even:flex-row-reverse max-w-[1040px] min-w-[750px] h-[400px] border-solid overflow-hidden	rounded-md group shadow-lg hover:shadow-2xl transition-all duration-500 even:bg-gradient-to-r odd:bg-gradient-to-l from-white to-gray-200'>
			<div className='overflow-hidden w-full min-w-3/5 min-h-[396px] p-2 rounded-md'>
				<Carousel images={images.map(image => image.secure_url)} delay={delay} />
			</div>
			<div className='w-full h-full p-4 flex flex-col justify-between'>
				<div>
					<div className='text-title max-h-[72px] pb-4'>{title}</div>
					<div className='text-subtitle max-h-[220px] truncate whitespace-break-spaces'>
						{DangerousHtml(description)}
					</div>
				</div>
				<div className='flex justify-end '>
					<Button onClick={() => onClick(_id)}>Read More</Button>
				</div>
			</div>
		</div>
	)
}

export default AboutUsCard
