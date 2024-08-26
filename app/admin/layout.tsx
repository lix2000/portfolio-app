'use client'
import { AdminSidebar, ProtectedRoute } from '@components'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
	modal: ReactNode
	rightSidebar: ReactNode
}

const AdminLayout = ({ children, modal, rightSidebar }: PropsWithChildren<Props>) => (
	<ProtectedRoute>
		<div className='relative w-full h-full flex'>
			<AdminSidebar />
			{modal}
			{rightSidebar}
			<div className='w-full h-full overflow-auto pt-[60px] sm:pt-0'>{children}</div>
		</div>
	</ProtectedRoute>
)

export default AdminLayout
