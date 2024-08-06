'use client'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import InfiniteScroll from 'react-infinite-scroller'
import { Loader } from '@components'

type Props = {
	data: any[]
	columns: ColumnDef<any, any>[]
	hasMore?: boolean
	loadMore: (page: number) => void
	onRowClick?: (row: any) => void
}

const TanStackTable = ({ data, columns, hasMore, loadMore, onRowClick, ...tableOptions }: Props) => {
	const tsTableClasses = [
		'w-full',
		'max-w-full',
		'rounded-t-lg',
		'text-[#25272980]',
		'text-[10px]',
		'leading-[14px]',
		'tracking-[0.5px]',
	]

	const tsTableRow = ['flex', 'items-center', 'w-auto', 'max-w-full', 'min-h-[40px]']
	const tsTableRowHeader = ['rounded-t-lg', 'bg-[#edeeee]', 'font-bold', 'border-b', 'border-b-white']

	const table = useReactTable({
		data,
		columns,
		columnResizeMode: 'onChange',
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		...tableOptions,
	})

	return (
		<div className={tsTableClasses.join(' ')}>
			{table.getHeaderGroups().map(headerGroup => (
				<div className={[...tsTableRowHeader, ...tsTableRow].join(' ')} key={headerGroup.id}>
					{headerGroup.headers.map(header => {
						const canSort = header.column.getCanSort()
						const isSorted = header.column.getIsSorted()
						const classNames = ['relative', 'flex', 'justify-between', 'items-center', 'p-3']
						if (canSort) classNames.push('cursor-pointer text-[#385f87]')
						if (isSorted) classNames.push('text-[#51667b]')
						const resizerClassNames = [
							'absolute',
							'opacity-0',
							'top-0',
							'right-[4px]',
							'h-full',
							'px-1',
							'cursor-col-resize',
							'select-none',
							'touch-none',
							'rounded-md',
							'flex',
							'items-center',
							'justify-center',
							header.column.getIsResizing() && 'opacity-30',
							'after:block',
							'bg-[#25272980]',
							'w-[3px]',
							'h-[50%]',
							'group-hover:opacity-30',
						]
						return (
							<div
								key={header.id}
								style={{ width: header.getSize() }}
								className={classNames.join(' ')}
								onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
							>
								<span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
								{!!isSorted && (
									<FontAwesomeIcon icon={faArrowUp} className={isSorted === 'desc' ? 'rotate-180' : ''} />
								)}
								<div
									onMouseDown={header.getResizeHandler()}
									onTouchStart={header.getResizeHandler()}
									className={resizerClassNames.join(' ')}
								/>
							</div>
						)
					})}
				</div>
			))}
			<InfiniteScroll
				loadMore={loadMore}
				useWindow={false}
				hasMore={hasMore}
				loader={<Loader key='table-loader' size='3x' />}
			>
				{table.getRowModel().rows.map(row => (
					<div
						className={[...tsTableRow, 'even:bg-[#f6f7f7] hover:bg-[#ebeff3] hover:cursor-pointer'].join(' ')}
						key={row.id}
						onClick={() => onRowClick?.(row)}
					>
						{row.getVisibleCells().map(cell => (
							<div className='p-[12px]' style={{ width: cell.column.getSize() }} key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</div>
						))}
					</div>
				))}
			</InfiniteScroll>
		</div>
	)
}
export default TanStackTable
