'use server'
import { FormAppointmentType, ServerAppointmentType } from '@types'
import { Appointment } from '@models'
import { compileTemplate, db, log, transporter } from '@lib'
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
		.then(async () => {
			const mailOptions = {
				from: 'xprienti@outlook.com',
				to: 'xprienti@outlook.com',
				subject: 'New appointment',
				html: compileTemplate(newAppointmentTemplate, {
					...data,
					date: new Date(data.date).toLocaleDateString('en-US', {
						month: '2-digit',
						day: '2-digit',
						year: 'numeric',
					}),
					redirectUrl: 'https://youtube.com',
				}),
				attachments: uploadedImages.map(image => ({
					path: image.secure_url,
					filename: `${image.original_filename}.${image.format}`,
				})),
			}
			await transporter
				.sendMail(mailOptions)
				.then(() => log.warn('Appointment email sent'))
				.catch(err => log.error('Appointment email failed', err))
		})
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
