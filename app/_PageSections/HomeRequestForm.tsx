'use client'
import { ContactForm, Modal } from '@components'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCreateRequest, useToggle } from '@hooks'
import { FormRequestType } from '@types'
import { Questrial } from 'next/font/google'

const questrial = Questrial({ weight: '400', subsets: ['latin'] })

const HomeRequestForm = () => {
	const [isModalOpen, toggleModalOpen] = useToggle(false)
	const mutation = useCreateRequest()

	const onSubmit = async (data: FormRequestType) => {
		await mutation.mutateAsync(data)
		toggleModalOpen()
	}

	return (
		<>
			<button
				onClick={toggleModalOpen}
				className='h-[60px] w-[60px] bg-tertiary text-tertiary-contrast text-title-xl rounded-full flex-center shadow-2xl
    hover:bg-primary hover:text-primary-contrast hover:shadow-primary transition-all mt-7'
			>
				<FontAwesomeIcon icon={faCalendar} />
			</button>
			<Modal
				visible={isModalOpen}
				onCancel={toggleModalOpen}
				className={`min-w-[350px] max-w-[650px] ${questrial.className}`}
			>
				<ContactForm onSubmit={onSubmit} />
			</Modal>
		</>
	)
}

export default HomeRequestForm
