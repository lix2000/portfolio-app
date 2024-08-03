'use client'
import { Button, TanStackTable, Title } from '@components'
import Link from 'next/link'
import { Row, createColumnHelper } from '@tanstack/react-table'
import { ServerServiceType } from '@types'
import { useRouter } from 'next/navigation'
import { usePortfolios } from '@hooks'

const columnHelper = createColumnHelper<ServerServiceType>()

const columns = [
	columnHelper.accessor('title', {
		header: 'Title',
	}),
	columnHelper.accessor('images', {
		header: 'Images',
		cell: info => info.getValue()?.length,
	}),
]

const PortfolioList = () => {
	const router = useRouter()
	const { data, fetchNextPage, hasNextPage } = usePortfolios()
	const tableData = data?.pages.flatMap(page => page.data) ?? []

	const onRowClick = (row: Row<ServerServiceType>) =>
		router.push(`/admin/portfolio/${row.original._id}`, { scroll: false })

	return (
		<div className='w-full h-full flex flex-col'>
			<Title.Label>
				Portfolio
				<Link href='/admin/portfolio/new' scroll={false}>
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

export default PortfolioList
