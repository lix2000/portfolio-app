'use server'
import { db, docToJSON, getCurrentSession, log } from '@lib'
import { Service } from '@models'
import { deleteFiles, deleteFolder, upload } from '@actions'
import { CLOUDINARY_FOLDERS } from '@lib/settings'
import { FormServiceType, ServerServiceType } from '@types'
import { connection, FilterQuery } from 'mongoose'
import { spaceToDash } from '@utils'

type ServicePayload = Omit<FormServiceType, 'images'>

/**
 * Retrieves a list of services from the database, optionally with pagination
 * @param options - Optional object with page, limit, and filter properties
 * @returns An object with the list of services, number of pages, current page, and whether there are more pages
 */
export const getServices = async (options?: {
	page?: number
	limit?: number
	filter?: FilterQuery<ServerServiceType>
}) => {
	// Connect to the database
	await db.connect()
	log.info('⬇️ Fetching getServices', options)

	const { page = 1, limit = 10, filter } = options || {}

	// Calculate the offset for pagination
	const offset = (page - 1) * limit

	// Retrieve the services and count the number of documents that match the filter
	const [services, count] = await Promise.all([
		Service.find(filter || {})
			.skip(offset)
			.limit(limit)
			.lean(),
		Service.countDocuments(filter),
	])

	// Calculate the number of pages
	const pages = Math.ceil(count / limit)

	// Determine whether there are more pages
	const hasMore = page < pages

	log.success('✅ Fetched getServices')

	return { data: docToJSON<ServerServiceType[]>(services), pages, page, hasMore }
}

/**
 * Retrieves a service by its ID
 * @param id - The ID of the service to retrieve
 * @returns The service object
 * @throws An error if the service does not exist
 */
export const getService = async (id: string) => {
	// Connect to the database
	await db.connect()

	log.info('⬇️ Fetching getService', id)

	// Retrieve the service
	const service = await Service.findById(id)

	// Throw an error if the service does not exist
	if (!service) throw new Error('Service not found')

	log.success('✅ Fetched getService')

	return docToJSON<ServerServiceType>(service)
}

/**
 * Creates a new service using the provided form data
 * @param formData - The form data containing the service information
 * @returns The created service object
 * @throws An error if the user is not authenticated or the service already exists
 */
export const createService = async (servicePayload: ServicePayload, imagesFormData: FormData) => {
	// Connect to the database
	await db.connect()
	log.info('⬆️ Fetching createService', servicePayload)

	// Get the current session and check if the user is authenticated
	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if a service with the same title already exists
	await checkServiceExists(servicePayload.title)

	// Retrieve the images from the form data
	const images = imagesFormData.getAll('images')

	// Upload the images to Cloudinary
	const uploadedImages = await upload(
		images as File[],
		`${CLOUDINARY_FOLDERS.SERVICES}/${spaceToDash(servicePayload.title)}`
	)

	// Create a new Service object with the uploaded images
	const service = new Service({ ...servicePayload, images: uploadedImages })

	// Save the service to the database
	await service.save().catch(async (err: any) => {
		if (uploadedImages?.length) {
			// Delete the uploaded images and the folder if there are any
			await deleteFiles(uploadedImages.map(image => image.public_id))
			await deleteFolder(`${CLOUDINARY_FOLDERS.SERVICES}/${spaceToDash(servicePayload.title)}`)
		}
		throw new Error(err)
	})

	log.success('✅ Fetched createService')

	return docToJSON<ServerServiceType>(service)
}

/**
 * Edits a service with the provided ID using the form data
 * @param id - The ID of the service to edit
 * @param formData - The form data containing the service information
 * @returns The edited service
 */
export const editService = async (id: string, servicePayload: ServicePayload, imagesFormData: FormData) => {
	// Connect to the database
	await db.connect()
	log.info('⬆️ Fetching editService', id)

	// Get the current session and check if the user is authenticated
	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if a service with the same title already exists
	const existingServiceWithSameTitle = await Service.findOne({
		title: servicePayload.title,
		_id: { $ne: id },
	})
	if (existingServiceWithSameTitle) throw new Error('Service with the same title already exists')

	// Extract new and existing images from the form data
	const newImages = imagesFormData.getAll('newImages') as unknown as File[]
	const existingFormImageIds = imagesFormData.getAll('existingImageIds') as string[]

	// Upload new images
	const uploadedImages = await upload(
		newImages,
		`${CLOUDINARY_FOLDERS.SERVICES}/${spaceToDash(servicePayload.title)}`
	)

	// Find the service by ID
	const service = await Service.findById(id)
	if (!service) throw new Error('Service not found')

	// Identify deleted image IDs
	const deletedImageIds = service.images
		.map(image => image.public_id)
		.filter(imageId => !existingFormImageIds.includes(imageId))

	// Update service data with new images
	Object.assign(service, {
		...servicePayload,
		images: [
			...service.images.filter(image => existingFormImageIds.includes(image.public_id)),
			...uploadedImages,
		],
	})

	// Save the updated service
	await service
		.save()
		.then(async () => {
			// Delete unused images
			if (deletedImageIds.length) await deleteFiles(deletedImageIds)
		})
		.catch(async (err: any) => {
			// Rollback if there's an error
			if (uploadedImages?.length) await deleteFiles(uploadedImages.map(image => image.public_id))

			throw new Error(err)
		})

	log.success('✅ Fetched editService', id)

	return docToJSON<ServerServiceType>(service)
}

/**
 * Deletes a service by its ID.
 * Deletes all the service's images from the cloudinary server.
 * @param id - The ID of the service to delete.
 * @returns A Promise that resolves to true if the operation is successful.
 * @throws An error if the service or the images cannot be deleted.
 */
export const deleteService = async (id: string) => {
	// Connect to the database
	await db.connect()

	log.info('⬆️ Fetching deleteService', id)

	// Find the service by ID
	const service = await Service.findById(id)
	if (!service) throw new Error('Service not found')

	// Extract the image public IDs
	const imageIds = service.images.map(image => image.public_id)

	// Delete the service and all its images
	await Promise.all([
		Service.deleteOne({ _id: id }), // Delete the service
		deleteFiles(imageIds), // Delete the service's images
	])

	log.success('✅ Fetched deleteService', id)

	return true // Return true if the operation is successful
}

export const checkServiceExists = async (title: string | undefined) => {
	const existingService = await Service.findOne({ title })
	if (existingService) {
		throw new Error('Service already exists')
	}
}

export const updateServicesDev = async (newKeys: any) => {
	await db.connect()
	await connection.collection('services').updateMany({}, newKeys)
}

/**
 * Retrieves the names of all services from the database.
 * @returns A Promise that resolves to an array of service names.
 * @throws An error if the services cannot be retrieved.
 */
export const getServiceNames = async () => {
	await db.connect()
	log.info('⬇️ Fetching getServiceNames')

	const services: Partial<ServerServiceType>[] = await Service.find({}, { title: 1, _id: 1 }).lean()

	log.success('✅ Fetched getServiceNames')
	return JSON.parse(JSON.stringify(services))
}

/**
 * Returns the count of services in the database
 * @returns The count of services
 */
export const getServiceCount = async () => {
	await db.connect()
	log.info('⬇️ Fetching getServiceCount')

	const count = await Service.countDocuments()

	log.success('✅ Fetched getServiceCount')

	return count
}
