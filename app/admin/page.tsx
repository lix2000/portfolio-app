'use client'
import { Title } from '@components'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { useDocumentCounts } from '@hooks'

const Card = ({ title, count, to }: { title: string; count: number | undefined; to: string }) => {
	const cardVariants = {
		initial: { scale: 0.9, opacity: 0 },
		enter: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
		exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
	}
	return (
		<motion.div variants={cardVariants} initial='initial' animate='enter' exit='exit'>
			<Link className='w-full' href={to}>
				<div className='w-full h-full rounded-3xl bg-white p-4 flex flex-col justify-center items-center shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-t from-white to-gray-200 text-primary cursor-pointer'>
					<div className='w-full flex-center p-4'>
						<CountUp className='text-[100px]' end={count || 0} duration={2} />
					</div>
					<h4 className='text-title-xl font-semibold text-center'>{title}</h4>
				</div>
			</Link>
		</motion.div>
	)
}

const Admin = () => {
	const { data: session } = useSession()
	const [
		{ data: articleCount = 0 },
		{ data: serviceCount = 0 },
		{ data: portfolioCount = 0 },
		{ data: newAppointmentsCount = 0 },
	] = useDocumentCounts()

	return (
		<div className='w-full h-full max-h-screen flex flex-col'>
			<Title.Label>Welcome, {session?.user?.name}</Title.Label>
			<div className='w-full flex-1 grid grid-rows-2 min-h-0 grid-cols-1 sm:grid-cols-2 gap-6 p-4'>
				<Card title='New Appointment' count={newAppointmentsCount} to='admin/appointments' />
				<Card title='Articles' count={articleCount} to='admin/articles' />
				<Card title='Services' count={serviceCount} to='admin/services' />
				<Card title='Portfolio' count={portfolioCount} to='admin/portfolio' />
			</div>
		</div>
	)
}

export default Admin
