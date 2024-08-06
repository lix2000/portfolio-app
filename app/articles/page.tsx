'use client'
import { Card, Loader, Title } from '@components'
import { useArticles } from '@hooks'
import { useRouter } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroller'

const Articles = () => {
	const { data, fetchNextPage, hasNextPage } = useArticles()
	const articles = data?.pages.flatMap(page => page.data) ?? []
	const router = useRouter()
	const goToArticle = (id: string) => {
		router.push(`/articles/${id}`)
	}

	return (
		<div className='w-full h-full pt-[60px] flex flex-col items-center '>
			<Title>Articles</Title>
			<div className='w-fill h-fill min-w-[310px] max-w-[1040px] m-10 '>
				<div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
					<InfiniteScroll
						useWindow={false}
						hasMore={hasNextPage}
						loadMore={() => fetchNextPage()}
						loader={<Loader key='table-loader' size='3x' />}
					>
						{articles.map((article, index) => (
							<Card
								key={index}
								{...{ ...article, delay: index * 1000, onClick: () => goToArticle(article._id as string) }}
							/>
						))}
					</InfiniteScroll>
				</div>
			</div>
		</div>
	)
}

export default Articles
