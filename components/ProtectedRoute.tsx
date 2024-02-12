import { getCurrentSession } from '@lib'
import { redirect } from 'next/navigation'

interface Props {
	children: React.ReactNode
}

const ProtectedRoute = async ({ children }: Props) => {
	const session = await getCurrentSession()

	if (!session || !session.user) return redirect('/api/auth/signin')

	return <>{children}</>
}

export default ProtectedRoute
