'use client'
import { usePortfolio } from '@hooks'
import { Title } from '@components'
import Image from 'next/image'

type Props = {
	params: {
		id: string
	}
}

const Portfolio = ({ params: { id } }: Props) => {
	const { data: portfolio } = usePortfolio(id)
	const { title, images } = portfolio || {}

	return (
		<div className='w-full max-w-full items-center pt-[60px] flex box-border flex-col'>
			<Title>{title}</Title>
			<div className='w-full flex flex-row flex-wrap gap-4 justify-center py-[50px] px-[30px]'>
				{images?.map(({ url }) => (
					<div
						key={url}
						className='flex-center border p-[10px] rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group'
					>
						<Image
							src={url}
							width={500}
							height={0}
							style={{ width: '500px', height: 'auto' }}
							alt='portfolio'
							className='group-hover:scale-110 transition-all duration-500'
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Portfolio
