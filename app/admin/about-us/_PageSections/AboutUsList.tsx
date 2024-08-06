'use client'
import { Button, TanStackTable, Title } from '@components'
import Link from 'next/link'
import { useAboutUses } from '@hooks'
import { Row, createColumnHelper } from '@tanstack/react-table'
import { ServerAboutUsType } from '@types'
import { useRouter } from 'next/navigation'
import { extractContent } from '@utils'

const columnHelper = createColumnHelper<ServerAboutUsType>()

const columns = [
	columnHelper.accessor('title', {
		header: 'Title',
	}),
	columnHelper.accessor('description', {
		header: 'Description',
		cell: info => <div className='truncate'>{extractContent(info.renderValue() ?? '')}</div>,
	}),
]

const AboutUsList = () => {
	const router = useRouter()
	const { data, fetchNextPage, hasNextPage } = useAboutUses()
	const tableData = data?.pages.flatMap(page => page.data) ?? []

	const onRowClick = (row: Row<ServerAboutUsType>) =>
		router.push(`/admin/about-us/${row.original._id}`, { scroll: false })

	return (
		<div className='w-full h-full flex flex-col'>
			<Title.Label>
				About Us
				<Link href='/admin/about-us/new' scroll={false}>
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

export default AboutUsList
