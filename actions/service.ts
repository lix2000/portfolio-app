'use server'
import { db, getCurrentSession, log } from '@lib'
import { Service } from '@models'
import { deleteFiles, deleteFolder, upload } from '@actions'
import { CLOUDINARY_FOLDERS } from '@lib/settings'
import { FormServiceType, ServerServiceType } from '@types'
import { connection, FilterQuery } from 'mongoose'
import { spaceToDash } from '@utils'

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
	log.success('getServices', options)
	// Connect to the database
	await db.connect()

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

	return { data: JSON.parse(JSON.stringify(services)) as ServerServiceType[], pages, page, hasMore }
}

/**
 * Retrieves a service by its ID
 * @param id - The ID of the service to retrieve
 * @returns The service object
 * @throws An error if the service does not exist
 */
export const getService = async (id: string) => {
	log.success('getService', id)
	// Connect to the database
	await db.connect()

	// Retrieve the service
	const service = await Service.findById(id)

	// Throw an error if the service does not exist
	if (!service) throw new Error('Service not found')

	return service.toObject() as ServerServiceType
}

/**
 * Creates a new service using the provided form data
 * @param formData - The form data containing the service information
 * @returns The created service object
 * @throws An error if the user is not authenticated or the service already exists
 */
export const createService = async (formData: FormData) => {
	log.success('createService', formData)
	// Connect to the database
	await db.connect()

	// Get the current session and check if the user is authenticated
	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Extract the service data from the form data
	const serviceData: Partial<FormServiceType> = Object.fromEntries(formData)

	// Check if a service with the same title already exists
	await checkServiceExists(serviceData.title)

	// Retrieve the images from the form data
	const images = formData.getAll('images')

	// Upload the images to Cloudinary
	const uploadedImages = await upload(
		images as File[],
		`${CLOUDINARY_FOLDERS.SERVICES}/${spaceToDash(serviceData.title)}`
	)

	// Create a new Service object with the uploaded images
	const service = new Service({ ...serviceData, images: uploadedImages })

	// Save the service to the database
	await service.save().catch(async (err: any) => {
		if (uploadedImages?.length) {
			// Delete the uploaded images and the folder if there are any
			await deleteFiles(uploadedImages.map(image => image.public_id))
			await deleteFolder(`${CLOUDINARY_FOLDERS.SERVICES}/${spaceToDash(serviceData.title)}`)
		}
		throw new Error(err)
	})

	return service.toObject()
}

/**
 * Edits a service with the provided ID using the form data
 * @param id - The ID of the service to edit
 * @param formData - The form data containing the service information
 * @returns The edited service
 */
export const editService = async (id: string, formData: FormData) => {
	log.success('editService', id, formData)
	// Connect to the database
	await db.connect()

	// Get the current session and check if the user is authenticated
	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Extract service form data
	const serviceFormData: Partial<FormServiceType> = Object.fromEntries(formData)

	// Check if a service with the same title already exists
	const existingServiceWithSameTitle = await Service.findOne({
		title: serviceFormData.title,
		_id: { $ne: id },
	})
	if (existingServiceWithSameTitle) throw new Error('Service with the same title already exists')

	// Extract new and existing images from the form data
	const newImages = formData.getAll('newImages') as unknown as File[]
	const existingFormImageIds = formData.getAll('existingImageIds') as string[]
	log.info('existingFormImageIds', existingFormImageIds)
	log.info('newImages', newImages)

	// Upload new images
	const uploadedImages = await upload(
		newImages,
		`${CLOUDINARY_FOLDERS.SERVICES}/${spaceToDash(serviceFormData.title)}`
	)

	// Find the service by ID
	const service = await Service.findById(id)
	if (!service) throw new Error('Service not found')

	// Identify deleted image IDs
	const deletedImageIds = service.images
		.map(image => image.public_id)
		.filter(imageId => !existingFormImageIds.includes(imageId))

	// Update service data with new images
	const { images, ...updatedServiceData } = serviceFormData
	Object.assign(service, {
		...updatedServiceData,
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

	return service.toObject()
}

/**
 * Deletes a service by its ID.
 * Deletes all the service's images from the cloudinary server.
 * @param id - The ID of the service to delete.
 * @returns A Promise that resolves to true if the operation is successful.
 * @throws An error if the service or the images cannot be deleted.
 */
export const deleteService = async (id: string) => {
	log.success('deleteService', id)
	// Connect to the database
	await db.connect()

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

	return true // Return true if the operation is successful
}

export const checkServiceExists = async (title: string | undefined) => {
	log.success('checkServiceExists', title)
	const existingService = await Service.findOne({ title })
	if (existingService) {
		throw new Error('Service already exists')
	}
}

export const updateServicesDev = async (newKeys: any) => {
	log.success('updateServicesDev', newKeys)
	await db.connect()
	await connection.collection('services').updateMany({}, newKeys)
}
