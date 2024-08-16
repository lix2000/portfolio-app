'use client'
import toast, { Toast, ToastType, useToaster } from 'react-hot-toast'
import { isValidElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const Icon: Record<ToastType, React.ReactNode> = {
	success: <FontAwesomeIcon icon={faCheckCircle} />,
	error: <FontAwesomeIcon icon={faExclamationCircle} />,
	loading: <FontAwesomeIcon icon={faSpinner} pulse />,
	blank: null,
	custom: null,
}

const iconStyles: Record<ToastType, string> = {
	success: 'bg-lime-400 text-white',
	error: 'bg-red-500 text-white',
	loading: 'bg-primary text-white',
	blank: '',
	custom: '',
}

const ToastComponent = ({
	toast,
	handlers,
	dismiss,
}: {
	toast: Toast
	handlers: any
	dismiss: () => void
}) => {
	const { startPause, endPause } = handlers
	return (
		<motion.div
			className='fixed inset-0 flex-center bg-black/30 backdrop-blur-sm z-[200]'
			onClick={dismiss}
			transition={{ duration: 0.3 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className={`relative rounded-xl py-14 px-32 flex-center flex-col bg-primary-contrast text-primary select-none`}
				onMouseEnter={startPause}
				onMouseLeave={endPause}
				initial={{ scale: 0 }}
				animate={{ scale: 1, transition: { duration: 0.3 } }}
				exit={{ scale: 0, transition: { duration: 0.2 } }}
				{...toast.ariaProps}
			>
				{!!Icon[toast.type] && (
					<div
						className={`w-[80px] h-[80px] rounded-full absolute top-0 left-50% transform -translate-y-1/2 shadow-lg flex-center text-title-xl ${iconStyles[toast.type]}`}
					>
						{Icon[toast.type]}
					</div>
				)}
				<div className='text-[20px]'>
					{typeof toast.message === 'string' || isValidElement(toast.message) ? toast.message : null}
				</div>
			</motion.div>
		</motion.div>
	)
}
const Toaster = () => {
	const { toasts, handlers } = useToaster()
	const { startPause, endPause } = handlers
	const dismiss = () => toast.dismiss()

	return (
		<AnimatePresence>
			{toasts
				.filter(toast => toast.visible)
				.map(toast => (
					<ToastComponent
						key={toast.id}
						toast={toast}
						handlers={{ startPause, endPause }}
						dismiss={dismiss}
					/>
				))}
		</AnimatePresence>
	)
}

export default Toaster
