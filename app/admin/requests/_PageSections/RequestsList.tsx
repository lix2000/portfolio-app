'use client'
import { TanStackTable, Title } from '@components'
import { useRequests } from '@hooks'
import { Row, createColumnHelper } from '@tanstack/react-table'
import { ServerRequestType, ServerServiceType } from '@types'
import { useRouter } from 'next/navigation'

const columnHelper = createColumnHelper<ServerRequestType>()

const columns = [
	columnHelper.accessor('fullName', {
		header: 'Full Name',
		cell: info => <div className='truncate'>{info.renderValue()}</div>,
	}),
	columnHelper.accessor('email', {
		header: 'Email',
		cell: info => <div className='truncate'>{info.renderValue()}</div>,
	}),
	columnHelper.accessor('service', {
		header: 'Service',
		cell: info => (
			<div className='truncate'>{(info.getValue() as Pick<ServerServiceType, 'title'>)?.title}</div>
		),
	}),
	columnHelper.accessor('date', {
		header: 'Date',
		cell: info => new Date(info.getValue()).toLocaleDateString(),
	}),
	columnHelper.accessor('address', {
		header: 'Address',
		cell: info => <div className='truncate'>{info.renderValue()}</div>,
	}),
	columnHelper.accessor('description', {
		header: 'Description',
		cell: info => <div className='truncate'>{info.renderValue()}</div>,
	}),
	columnHelper.accessor('isViewed', {
		header: 'Status',
		cell: info =>
			!info.getValue() ? (
				<div className='py-1 px-2 rounded-full bg-primary text-primary-contrast flex-center'>New</div>
			) : (
				''
			),
	}),
]

const RequestsList = () => {
	const router = useRouter()
	const { data, fetchNextPage, hasNextPage } = useRequests()
	const tableData = data?.pages.flatMap(page => page.data) ?? []

	const onRowClick = (row: Row<ServerRequestType>) =>
		router.push(`/admin/requests/${row.original._id}`, { scroll: false })

	return (
		<div className='w-full h-full flex flex-col'>
			<Title.Label>Requests</Title.Label>
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

export default RequestsList
