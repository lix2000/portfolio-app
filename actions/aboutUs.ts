'use server'
import { db, getCurrentSession } from '@lib'
import { AboutUs } from '@models'
import { deleteFiles, deleteFolder, upload } from '@actions'
import { CLOUDINARY_FOLDERS } from '@lib/settings'
import { FormAboutUsType, ServerAboutUsType } from '@types'
import { connection, FilterQuery } from 'mongoose'
import { spaceToDash } from '@utils'

type AboutUsPayload = Omit<FormAboutUsType, 'images'>

/**
 * Retrieves a list of aboutUs from the database, optionally with pagination
 * @param options - Optional object with page, limit, and filter properties
 * @returns An object with the list of aboutUs, number of pages, current page, and whether there are more pages
 */
export const getAboutUs = async (options?: {
	page?: number
	limit?: number
	filter?: FilterQuery<ServerAboutUsType>
}) => {
	await db.connect()

	const { page = 1, limit = 10, filter } = options || {}

	// Calculate the offset for pagination
	const offset = (page - 1) * limit

	// Retrieve the aboutUs and count the number of documents that match the filter
	const [aboutUs, count] = await Promise.all([
		AboutUs.find(filter || {})
			.skip(offset)
			.limit(limit)
			.lean(),
		AboutUs.countDocuments(filter),
	])

	// Calculate the number of pages
	const pages = Math.ceil(count / limit)

	// Determine whether there are more pages
	const hasMore = page < pages

	return { data: JSON.parse(JSON.stringify(aboutUs)) as ServerAboutUsType[], pages, page, hasMore }
}

/**
 * Retrieves a aboutUs by its ID
 * @param id - The ID of the aboutUs to retrieve
 * @returns The aboutUs object
 * @throws An error if the aboutUs does not exist
 */
export const getAboutUsById = async (id: string) => {
	await db.connect()

	// Retrieve the aboutUs
	const aboutUs = await AboutUs.findById(id)

	// Throw an error if the aboutUs does not exist
	if (!aboutUs) throw new Error('AboutUs not found')

	return aboutUs.toObject() as ServerAboutUsType
}

/**
 * Creates a new aboutUs using the provided form data
 * @param formData - The form data containing the aboutUs information
 * @returns The created aboutUs object
 * @throws An error if the user is not authenticated or the aboutUs already exists
 */
export const createAboutUs = async (aboutUsPayload: AboutUsPayload, imagesFormData: FormData) => {
	await db.connect()

	// Get the current session and check if the user is authenticated

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if a aboutUs with the same title already exists
	await checkAboutUsExists(aboutUsPayload.title)

	// Retrieve the images from the form data
	const images = imagesFormData.getAll('images')

	// Upload the images to Cloudinary
	const uploadedImages = await upload(
		images as File[],
		`${CLOUDINARY_FOLDERS.ABOUT_US}/${spaceToDash(aboutUsPayload.title)}`
	)

	// Create a new AboutUs object with the uploaded images
	const aboutUs = new AboutUs({ ...aboutUsPayload, images: uploadedImages })

	// Save the aboutUs to the database
	await aboutUs.save().catch(async (err: any) => {
		if (uploadedImages?.length) {
			// Delete the uploaded images and the folder if there are any
			await deleteFiles(uploadedImages.map(image => image.public_id))
			await deleteFolder(`${CLOUDINARY_FOLDERS.ABOUT_US}/${spaceToDash(aboutUsPayload.title)}`)
		}
		throw new Error(err)
	})

	return aboutUs.toObject()
}

/**
 * Edits a aboutUs with the provided ID using the form data
 * @param id - The ID of the aboutUs to edit
 * @param formData - The form data containing the aboutUs information
 * @returns The edited aboutUs
 */
export const editAboutUs = async (id: string, aboutUsPayload: AboutUsPayload, imagesFormData: FormData) => {
	await db.connect()

	// Get the current session and check if the user is authenticated
	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if a aboutUs with the same title already exists
	const existingAboutUsWithSameTitle = await AboutUs.findOne({
		title: aboutUsPayload.title,
		_id: { $ne: id },
	})
	if (existingAboutUsWithSameTitle) throw new Error('AboutUs with the same title already exists')

	// Extract new and existing images from the form data
	const newImages = imagesFormData.getAll('newImages') as unknown as File[]
	const existingFormImageIds = imagesFormData.getAll('existingImageIds') as string[]

	// Upload new images
	const uploadedImages = await upload(
		newImages,
		`${CLOUDINARY_FOLDERS.ABOUT_US}/${spaceToDash(aboutUsPayload.title)}`
	)

	// Find the aboutUs by ID
	const aboutUs = await AboutUs.findById(id)
	if (!aboutUs) throw new Error('AboutUs not found')

	// Identify deleted image IDs
	const deletedImageIds = aboutUs.images
		.map(image => image.public_id)
		.filter(imageId => !existingFormImageIds.includes(imageId))

	// Update aboutUs data with new images
	Object.assign(aboutUs, {
		...aboutUsPayload,
		images: [
			...aboutUs.images.filter(image => existingFormImageIds.includes(image.public_id)),
			...uploadedImages,
		],
	})

	// Save the updated aboutUs
	await aboutUs
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

	return aboutUs.toObject()
}

/**
 * Deletes a aboutUs by its ID.
 * Deletes all the aboutUs's images from the cloudinary server.
 * @param id - The ID of the aboutUs to delete.
 * @returns A Promise that resolves to true if the operation is successful.
 * @throws An error if the aboutUs or the images cannot be deleted.
 */
export const deleteAboutUs = async (id: string) => {
	await db.connect()

	// Find the aboutUs by ID
	const aboutUs = await AboutUs.findById(id)
	if (!aboutUs) throw new Error('AboutUs not found')

	// Extract the image public IDs
	const imageIds = aboutUs.images.map(image => image.public_id)

	// Delete the aboutUs and all its images
	await Promise.all([
		AboutUs.deleteOne({ _id: id }), // Delete the aboutUs
		deleteFiles(imageIds), // Delete the aboutUs's images
	])

	return true // Return true if the operation is successful
}

export const checkAboutUsExists = async (title: string | undefined) => {
	const existingAboutUs = await AboutUs.findOne({ title })
	if (existingAboutUs) {
		throw new Error('AboutUs already exists')
	}
}

export const getAboutUsCount = async () => {
	await db.connect()
	const count = await AboutUs.countDocuments()
	return count
}
