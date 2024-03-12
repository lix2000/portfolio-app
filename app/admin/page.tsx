'use client'
import { Title } from '@components'
import { useSession } from 'next-auth/react'

const Admin = () => {
	const { data: session } = useSession()
	return (
		<div className='w-full h-full'>
			<Title>Welcome, {session?.user?.name}</Title>
		</div>
	)
}

export default Admin
