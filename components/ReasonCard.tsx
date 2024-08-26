import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DangerousHtml from './DangerousHtml'
import Image from 'next/image'

interface Props {
	title: string
	description: string
	image: string
	id: String
}

const ReasonCard = ({ title, description = '', image }: Props) => {
	return (
		<div className='flex max-w-[1040px] min-w-[650px] h-fit border-solid overflow-hidden rounded-md group shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-200 p-6'>
			<div className='overflow-hidden w-1/5 min-w-[150px] min-h-[152px] pr-6 rounded-md flex-center'>
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
			<div className='w-full h-full flex flex-col justify-between'>
				<div>
					<div className='text-title max-h-[72px] pb-4'>{title}</div>
					<div className='text-subtitle min-h-[100px]'>{DangerousHtml(description)}</div>
				</div>
			</div>
		</div>
	)
}

export default ReasonCard
