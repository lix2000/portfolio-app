'use client'
import { articleMock } from '@lib/settings'
import { Card, Title } from '@components'
import { useRouter } from 'next/navigation'

const Articles = () => {
	//to do remove this when api is ready
	const articles = articleMock
	const router = useRouter()
	const goToArticle = (id: string) => {
		router.push(`/portfolio/${id}`)
	}

	return (
		<div className='w-full h-full pt-[60px] flex flex-col items-center '>
			<Title>Articles</Title>
			<div className='w-fill h-fill min-w-[310px] max-w-[1040px] m-10 '>
				<div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
					{articles.map((article, index) => (
						<Card
							key={index}
							{...{ ...article, delay: index * 1000, onClick: () => goToArticle(article.id) }}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Articles
