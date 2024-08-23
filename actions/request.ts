'use server'
import { FormRequestType, ServerRequestType, ServerServiceType } from '@types'
import { Request } from '@models'
import { compileTemplate, db, docToJSON, getCurrentSession, log, transporter } from '@lib'
import { newRequestTemplate } from '@lib/mailTemplates'
import { deleteFiles, deleteFolder, upload, verifyRecaptcha } from '@actions'
import { spaceToDash } from '@utils'
import { CLOUDINARY_FOLDERS } from '@lib/settings'

type RequestPayload = Omit<FormRequestType, 'images'>

export const createRequest = async (data: RequestPayload, imagesFormData?: FormData) => {
	await db.connect()
	log.info('⬆️ Fetching createRequest')
	const isHuman = await verifyRecaptcha(data.recaptchaToken)
	if (!isHuman) throw new Error('Human verification failed')

	const images = imagesFormData?.getAll('images') as unknown as File[]
	const uploadedImages = await upload(images, `${CLOUDINARY_FOLDERS.REQUESTS}/${spaceToDash(data.fullName)}`)

	const request = new Request({ ...data, images: uploadedImages })
	await request
		.save()
		.then(async req => await sendNewRequestEmail((await req.populate('service', 'title')).toObject()))
		.catch(async err => {
			if (uploadedImages?.length) {
				// Delete the uploaded images and the folder if there are any
				await deleteFiles(uploadedImages.map(image => image.public_id))
				await deleteFolder(`${CLOUDINARY_FOLDERS.SERVICES}/${spaceToDash(data.fullName)}`)
			}
			throw new Error(err)
		})

	log.success('✅ Fetched createRequest')

	return docToJSON<ServerRequestType>(request)
}

const sendNewRequestEmail = async (request: ServerRequestType) => {
	const { _id, images, service } = request

	const { OUTLOOK_EMAIL_ADDRESS, NEXT_PUBLIC_WEBSITE_URL } = process.env
	const mailOptions = {
		from: OUTLOOK_EMAIL_ADDRESS,
		to: OUTLOOK_EMAIL_ADDRESS,
		subject: 'New request',
		html: compileTemplate(newRequestTemplate, {
			...request,
			service: (service as Pick<ServerServiceType, 'title'>).title,
			redirectUrl: `${NEXT_PUBLIC_WEBSITE_URL}/admin/requests/${_id}`,
		}),
		attachments: images.map(image => ({
			path: image.secure_url,
			filename: `${image.original_filename}.${image.format}`,
		})),
	}
	await transporter
		.sendMail(mailOptions)
		.then(() => log.warn('ℹ️ Request email sent'))
		.catch(err => log.error('❌ Request email failed', err))
}

export const getRequests = async (options?: { page?: number; limit?: number }) => {
	await db.connect()
	log.info('⬇️ Fetching getRequests')

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	const { page = 1, limit = 10 } = options || {}

	// Calculate the offset for pagination
	const offset = (page - 1) * limit

	// Retrieve the services and count the number of documents that match the filter
	const [requests, count] = await Promise.all([
		Request.find().populate('service', 'title').skip(offset).limit(limit).lean(),
		Request.countDocuments(),
	])

	// Calculate the number of pages
	const pages = Math.ceil(count / limit)

	// Determine whether there are more pages
	const hasMore = page < pages

	log.success('✅ Fetched getRequests')

	return { data: docToJSON<ServerRequestType[]>(requests), pages, page, hasMore }
}

export const getRequest = async (id: string) => {
	await db.connect()
	log.info('⬇️ Fetching getRequest', id)

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	const request = await updateIsViewedRequest(id)

	log.success('✅ Fetched getRequest')

	return docToJSON<ServerRequestType>(request)
}

export const updateIsViewedRequest = async (id: string) => {
	await db.connect()

	log.info('⬆️ Fetching updateIsViewedRequest', id)

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	const request = await Request.findByIdAndUpdate(id, { isViewed: true }, { new: true })
		.populate('service', 'title')
		.lean()
	if (!request) throw new Error('Request not found')

	log.success('✅ Fetched updateIsViewedRequest')

	return docToJSON<ServerRequestType>(request)
}

export const getRequestsCountByIsViewed = async (isViewed: boolean) => {
	await db.connect()

	log.info('⬇️ Fetching getRequestsCountByIsViewed', isViewed)

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	const count = await Request.countDocuments({ isViewed })

	log.success('✅ Fetched getRequestsCountByIsViewed', isViewed)

	return count
}
