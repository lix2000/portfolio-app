'use client'
import { AdminSidebar, Button, ProtectedRoute } from '@components'
import { signOut } from 'next-auth/react'
import { PropsWithChildren } from 'react'

const AdminLayout = ({ children }: PropsWithChildren) => (
	<ProtectedRoute>
		<div className='relative w-full h-full flex'>
			<AdminSidebar />
			{children}
			<Button className='absolute bottom-12 right-12' onClick={() => signOut()}>
				Logout
			</Button>
		</div>
	</ProtectedRoute>
)

export default AdminLayout
