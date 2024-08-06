'use client'
import { Button, TanStackTable, Title } from '@components'
import Link from 'next/link'
import { useArticles } from '@hooks'
import { Row, createColumnHelper } from '@tanstack/react-table'
import { ServerArticleType } from '@types'
import { useRouter } from 'next/navigation'
import { extractContent } from '@utils'

const columnHelper = createColumnHelper<ServerArticleType>()

const columns = [
	columnHelper.accessor('title', {
		header: 'Title',
	}),
	columnHelper.accessor('description', {
		header: 'Description',
		cell: info => <div className='truncate'>{extractContent(info.renderValue() ?? '')}</div>,
	}),
]

const ArticlesList = () => {
	const router = useRouter()
	const { data, fetchNextPage, hasNextPage } = useArticles()
	const tableData = data?.pages.flatMap(page => page.data) ?? []

	const onRowClick = (row: Row<ServerArticleType>) =>
		router.push(`/admin/articles/${row.original._id}`, { scroll: false })

	return (
		<div className='w-full h-full flex flex-col'>
			<Title.Label>
				Articles
				<Link href='/admin/articles/new' scroll={false}>
					<Button className='text-body float-right'>New</Button>
				</Link>
			</Title.Label>
			<div className='mx-8 rounded-t-lg flex-1 overflow-y-auto'>
				<TanStackTable
					data={tableData}
					hasMore={hasNextPage}
					loadMore={() => fetchNextPage()}
					columns={columns}
					onRowClick={onRowClick}
				/>
			</div>
		</div>
	)
}

export default ArticlesList
