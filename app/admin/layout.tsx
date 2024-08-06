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
			{children}
		</div>
	</ProtectedRoute>
)

export default AdminLayout
