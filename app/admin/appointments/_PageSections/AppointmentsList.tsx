'use client'
import { TanStackTable, Title } from '@components'
import { useAppointments } from '@hooks'
import { Row, createColumnHelper } from '@tanstack/react-table'
import { ServerAppointmentType } from '@types'
import { useRouter } from 'next/navigation'

const columnHelper = createColumnHelper<ServerAppointmentType>()

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

const AppointmentsList = () => {
	const router = useRouter()
	const { data, fetchNextPage, hasNextPage } = useAppointments()
	const tableData = data?.pages.flatMap(page => page.data) ?? []

	const onRowClick = (row: Row<ServerAppointmentType>) =>
		router.push(`/admin/appointments/${row.original._id}`, { scroll: false })

	return (
		<div className='w-full h-full flex flex-col'>
			<Title.Label>Appointments</Title.Label>
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

export default AppointmentsList
