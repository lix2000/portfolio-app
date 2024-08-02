import { Title } from '@components'
import { portfolioMock } from '@lib/settings'

type Props = {
	params: {
		id: string
	}
}

const Portfolio = ({ params: { id } }: Props) => {
	//to do remove this when api is ready
	const { title, images } = portfolioMock.find(portfolio => portfolio.id === id) || {}
	return (
		<div className='w-full max-w-full min-h-full  pt-[60px] flex flex-col'>
			<Title>{title}</Title>
			<div className='w-full flex flex-row flex-wrap gap-4 justify-center py-[50px] px-[30px]'>
				{images?.map(({ url }) => (
					<div className='flex-center border p-[10px] rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group'>
						<img src={url} width={500} alt='portfolio' className='group-hover:scale-110 transition-all duration-500' />
					</div>
				))}
			</div>
		</div>
	)
}

export default Portfolio
