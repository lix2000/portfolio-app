'use client'
import { CardGrid, Title } from '@components'
import { useArticles } from '@hooks'
import { useRouter } from 'next/navigation'

const Articles = () => {
	const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useArticles()
	const articles = data?.pages.flatMap(page => page.data) ?? []
	const router = useRouter()
	const goToArticle = (id: string) => {
		router.push(`/articles/${id}`)
	}

	return (
		<div className='w-full h-full pt-[60px] flex flex-col items-center '>
			<Title>Articles</Title>
			<div className='w-full min-h-full h-fit pt-[60px] flex flex-col items-center'>
				<CardGrid
					{...{
						data: articles,
						onClick: goToArticle,
						fetchNextPage: fetchNextPage,
						hasNextPage: hasNextPage,
						disabledFetchNextPage: isFetchingNextPage,
						isLoading,
					}}
				/>
			</div>
		</div>
	)
}

export default Articles
