'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { MouseEvent, PropsWithChildren, useRef } from 'react'

type Props = {
	className?: string
}

const SidebarRight = ({ className, children }: PropsWithChildren<Props>) => {
	const router = useRouter()
	const backdropRef = useRef(null)
	const onClose = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === backdropRef.current) router.back()
	}

	return (
		<AnimatePresence>
			<motion.div
				ref={backdropRef}
				onClick={onClose}
				className='fixed top-0 left-0 w-full h-full z-40 flex items-center justify-end bg-black/50 backdrop-blur-md'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<motion.div
					className='flex flex-col w-[600px] h-screen bg-white shadow-lg rounded-l-xl'
					initial={{ x: '100%' }}
					animate={{ x: 0 }}
					transition={{ type: 'spring', duration: 0.5 }}
				>
					{children}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

export default SidebarRight
