'use client'
import { Title } from '@components'
import { useSession } from 'next-auth/react'

const Admin = () => {
	const { data: session } = useSession()

	return (
		<div className='w-full h-full'>
			<Title.Label>Welcome, {session?.user?.name}</Title.Label>
		</div>
	)
}

export default Admin
