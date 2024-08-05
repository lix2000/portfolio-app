'use client'
import { Carousel, Title } from '@components'
import { ServerAppointmentType } from '@types'

type Props = {
	appointment: ServerAppointmentType
}

export default function AppointmentPreview({ appointment }: Props) {
	const { fullName, email, description, date, service, budget, address, phoneNumber, images, isViewed } =
		appointment ?? {}

	return (
		<div className='flex flex-col'>
			<div className='px-4 py-2'>
				<Title.Label>Appointment Preview</Title.Label>
			</div>
			<div className='flex-1 px-8 py-2 overflow-y-auto'>
				<div className='h-[250px] mb-2'>
					<Carousel images={images.map(image => image.url)} />
				</div>
				<div className='my-4 text-body font-bold text-center'>
					<span className='bg-primary text-primary-contrast rounded-xl p-2'>{service}</span>
					<span className='bg-secondary text-secondary-contrast rounded-xl p-2 ml-2'>Budget: {budget}</span>
				</div>
				<div className='grid grid-cols-2 gap-4 text-base-800'>
					<div>
						<div className='font-bold text-primary'>Full Name: </div>
						<div>{fullName}</div>
					</div>
					<div>
						<div className='font-bold text-primary'>Email: </div>
						<div>{email}</div>
					</div>
					<div>
						<div className='font-bold text-primary'>Date: </div>
						<div>{new Date(date).toLocaleDateString('en-US')}</div>
					</div>
					<div>
						<div className='font-bold text-primary'>Address: </div>
						<div>{address}</div>
					</div>
					<div>
						<div className='font-bold text-primary'>Phone Number: </div>
						<div>{phoneNumber}</div>
					</div>
				</div>
				<div className='text-body mt-4'>{description}</div>
			</div>
		</div>
	)
}
