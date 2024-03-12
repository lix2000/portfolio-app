'use client'
import { Button, ProtectedRoute } from '@components'
import { signOut } from 'next-auth/react'
import { PropsWithChildren } from 'react'

const AdminLayout = ({ children }: PropsWithChildren) => (
	<ProtectedRoute>
		<div className='relative w-full h-full'>
			<Button className='absolute bottom-12 right-12' onClick={() => signOut()}>
				Logout
			</Button>
			{children}
		</div>
	</ProtectedRoute>
)

export default AdminLayout
