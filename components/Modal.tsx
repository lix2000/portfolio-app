'use client'
import { useRouter } from 'next/navigation'
import { MouseEvent, PropsWithChildren, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
	className?: string
	onCancel?: () => void
}

const Modal = ({ className = '', onCancel, children }: PropsWithChildren<Props>) => {
	const router = useRouter()
	const backdropRef = useRef(null)

	const onClose = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === backdropRef.current) onCancel ? onCancel() : router.back()
	}

	const classNames = 'shadow-card p-12 rounded-xl bg-tertiary max-h-full overflow-y-auto ' + className

	return (
		<AnimatePresence>
			<motion.div
				ref={backdropRef}
				className='fixed inset-0 flex-center bg-black/70 backdrop-blur-sm z-50'
				onClick={onClose}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<motion.div
					className={classNames}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.5 }}
				>
					{children}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

export default Modal
