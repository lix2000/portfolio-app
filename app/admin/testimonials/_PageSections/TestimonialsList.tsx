'use client'
import { Button, StarRatingPreview, TanStackTable, Title } from '@components'
import Link from 'next/link'
import { useTestimonials } from '@hooks'
import { Row, createColumnHelper } from '@tanstack/react-table'
import { ServerTestimonialType } from '@types'
import { useRouter } from 'next/navigation'

const columnHelper = createColumnHelper<ServerTestimonialType>()

const columns = [
	columnHelper.accessor('name', {
		header: 'Name',
	}),
	columnHelper.accessor('description', {
		header: 'Comment',
		cell: info => <div className='truncate'>{info.renderValue()}</div>,
	}),
	columnHelper.accessor('rating', {
		header: 'Rating',
		cell: info => <StarRatingPreview rating={info.getValue()} />,
	}),
]

const TestimonialsList = () => {
	const router = useRouter()
	const { data, fetchNextPage, hasNextPage } = useTestimonials()
	const tableData = data?.pages.flatMap(page => page.data) ?? []

	const onRowClick = (row: Row<ServerTestimonialType>) =>
		router.push(`/admin/testimonials/${row.original._id}`, { scroll: false })

	return (
		<div className='w-full h-full flex flex-col'>
			<Title.Label>
				Testimonials
				<Link href='/admin/testimonials/new' scroll={false}>
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

export default TestimonialsList
