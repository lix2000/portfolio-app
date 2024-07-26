'use client'
import { Button, TanStackTable, Title } from '@components'
import Link from 'next/link'
import { useServices } from '@hooks'
import { Row, createColumnHelper } from '@tanstack/react-table'
import { ServerServiceType } from '@types'
import { useRouter } from 'next/navigation'

const columnHelper = createColumnHelper<ServerServiceType>()

const columns = [
	columnHelper.accessor('title', {
		header: 'Title',
	}),
	columnHelper.accessor('price', {
		header: 'Price',
		cell: info => `$${info.renderValue()}`,
	}),
	columnHelper.accessor('priceDescription', {
		header: 'Price Description',
	}),
	columnHelper.accessor('description', {
		header: 'Description',
		cell: info => <div className='truncate'>{info.renderValue()}</div>,
	}),
]

const ServicesList = () => {
	const router = useRouter()
	const { data, fetchNextPage, hasNextPage } = useServices()
	const tableData = data?.pages.flatMap(page => page.data) ?? []

	const onRowClick = (row: Row<ServerServiceType>) =>
		router.push(`/admin/services/${row.original._id}`, { scroll: false })

	return (
		<div className='w-full h-full flex flex-col'>
			<Title.Label>
				Services
				<Link href='/admin/services/new' scroll={false}>
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

export default ServicesList
