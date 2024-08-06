'use server'
import { FormAppointmentType, ServerAppointmentType, ServerServiceType } from '@types'
import { Appointment } from '@models'
import { compileTemplate, db, getCurrentSession, log, transporter } from '@lib'
import { newAppointmentTemplate } from '@lib/mailTemplates'
import { deleteFiles, deleteFolder, upload, verifyRecaptcha } from '@actions'
import { spaceToDash } from '@utils'
import { CLOUDINARY_FOLDERS } from '@lib/settings'

type AppointmentPayload = Omit<FormAppointmentType, 'images'>

export const createAppointment = async (data: AppointmentPayload, imagesFormData?: FormData) => {
	log.info('createAppointment', data)
	await db.connect()
	const isHuman = await verifyRecaptcha(data.recaptchaToken)
	if (!isHuman) throw new Error('Human verification failed')

	const images = imagesFormData?.getAll('images') as unknown as File[]
	const uploadedImages = await upload(
		images,
		`${CLOUDINARY_FOLDERS.APPOINTMENTS}/${spaceToDash(data.fullName)}`
	)

	const appointment = new Appointment({ ...data, images: uploadedImages })
	await appointment
		.save()
		.then(async app => await sendNewAppointmentEmail((await app.populate('service', 'title')).toObject()))
		.catch(async err => {
			log.error('Appointment failed', err)
			if (uploadedImages?.length) {
				// Delete the uploaded images and the folder if there are any
				await deleteFiles(uploadedImages.map(image => image.public_id))
				await deleteFolder(`${CLOUDINARY_FOLDERS.SERVICES}/${spaceToDash(data.fullName)}`)
			}
			throw new Error(err)
		})

	return appointment.toObject() as ServerAppointmentType
}

const sendNewAppointmentEmail = async (appointment: ServerAppointmentType) => {
	const { _id, images, service, date } = appointment

	const { OUTLOOK_EMAIL_ADDRESS, NEXT_PUBLIC_WEBSITE_URL } = process.env
	const mailOptions = {
		from: OUTLOOK_EMAIL_ADDRESS,
		to: OUTLOOK_EMAIL_ADDRESS,
		subject: 'New appointment',
		html: compileTemplate(newAppointmentTemplate, {
			...appointment,
			service: (service as Pick<ServerServiceType, 'title'>).title,
			date: new Date(date).toLocaleDateString('en-US'),
			redirectUrl: `${NEXT_PUBLIC_WEBSITE_URL}/admin/appointments/${_id}`,
		}),
		attachments: images.map(image => ({
			path: image.secure_url,
			filename: `${image.original_filename}.${image.format}`,
		})),
	}
	await transporter
		.sendMail(mailOptions)
		.then(() => log.warn('Appointment email sent'))
		.catch(err => log.error('Appointment email failed', err))
}

export const getAppointments = async (options?: { page?: number; limit?: number }) => {
	await db.connect()

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	const { page = 1, limit = 10 } = options || {}

	// Calculate the offset for pagination
	const offset = (page - 1) * limit

	// Retrieve the services and count the number of documents that match the filter
	const [appointments, count] = await Promise.all([
		Appointment.find().populate('service', 'title').skip(offset).limit(limit).lean(),
		Appointment.countDocuments(),
	])

	// Calculate the number of pages
	const pages = Math.ceil(count / limit)

	// Determine whether there are more pages
	const hasMore = page < pages

	return { data: JSON.parse(JSON.stringify(appointments)) as ServerAppointmentType[], pages, page, hasMore }
}

export const getAppointment = async (id: string) => {
	await db.connect()

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	const appointment = await updateIsViewed(id)

	return appointment as ServerAppointmentType
}

export const updateIsViewed = async (id: string) => {
	await db.connect()

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	const appointment = await Appointment.findByIdAndUpdate(id, { isViewed: true }, { new: true })
		.populate('service', 'title')
		.lean()
	if (!appointment) throw new Error('Appointment not found')

	return appointment as ServerAppointmentType
}

export const getAppointmentsCountByIsViewed = async (isViewed: boolean) => {
	await db.connect()

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	const count = await Appointment.countDocuments({ isViewed })

	return count
}
