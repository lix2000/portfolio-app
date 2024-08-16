'use client'
import { useRouter } from 'next/navigation'
import { MouseEvent, PropsWithChildren, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import OnMobile from './OnMobile'

type Props = {
	visible?: boolean
	className?: string
	onCancel?: () => void
}

const Modal = ({ className = '', visible = true, onCancel, children }: PropsWithChildren<Props>) => {
	const router = useRouter()
	const backdropRef = useRef(null)

	const onClose = (doTargetCheck: boolean) => (e: MouseEvent<HTMLDivElement>) => {
		if (!doTargetCheck || e.target === backdropRef.current) onCancel ? onCancel() : router.back()
	}

	const classNames =
		'relative shadow-card p-12 rounded-xl bg-tertiary max-h-full overflow-y-auto ' + className

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					ref={backdropRef}
					className='fixed inset-0 flex-center bg-black/70 backdrop-blur-sm z-[150]'
					onClick={onClose(true)}
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
						<OnMobile>
							<div
								className='absolute top-4 right-4 text-title-xl text-gray-400 cursor-pointer'
								onClick={onClose(false)}
							>
								<FontAwesomeIcon icon={faXmark} />
							</div>
						</OnMobile>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Modal
