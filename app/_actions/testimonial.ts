'use server'
import { db, docToJSON, getCurrentSession, log } from '@lib'
import { Testimonial } from '@models'
import { FormTestimonialType, ServerTestimonialType } from '@types'
import { FilterQuery } from 'mongoose'
import { verifyRecaptcha } from '@actions'

/**
 * Retrieves a list of testimonials from the database, optionally with pagination
 * @param options - Optional object with page, limit, and filter properties
 * @returns An object with the list of testimonials, number of pages, current page, and whether there are more pages
 */
export const getTestimonials = async (options?: {
	page?: number
	limit?: number
	filter?: FilterQuery<ServerTestimonialType>
}) => {
	log.info('⬇️ Fetching getTestimonials', options)
	// Connect to the database
	await db.connect()

	const { page = 1, limit = 10, filter } = options || {}

	// Calculate the offset for pagination
	const offset = (page - 1) * limit

	// Retrieve the testimonials and count the number of documents that match the filter
	const [testimonials, count] = await Promise.all([
		Testimonial.find(filter || {})
			.skip(offset)
			.limit(limit)
			.lean(),
		Testimonial.countDocuments(filter),
	])

	// Calculate the number of pages
	const pages = Math.ceil(count / limit)

	// Determine whether there are more pages
	const hasMore = page < pages

	log.success('✅ Fetched getTestimonials')

	return { data: docToJSON<ServerTestimonialType[]>(testimonials), pages, page, hasMore }
}

/**
 * Retrieves a testimonial by its ID
 * @param id - The ID of the testimonial to retrieve
 * @returns The testimonial object
 * @throws An error if the testimonial does not exist
 */
export const getTestimonial = async (id: string) => {
	// Connect to the database
	await db.connect()
	log.info('⬇️ Fetching getTestimonial', id)

	// Retrieve the testimonial
	const testimonial = await Testimonial.findById(id)

	// Throw an error if the testimonial does not exist
	if (!testimonial) throw new Error('Testimonial not found')

	log.success('✅ Fetched getTestimonial')

	return docToJSON<ServerTestimonialType>(testimonial)
}

/**
 * Creates a new testimonial using the provided form data
 * @param testimonialPayload - The form data containing the testimonial information
 * @returns The created testimonial object
 * @throws An error if the user is not authenticated or the testimonial already exists
 */
export const createTestimonial = async (testimonialPayload: FormTestimonialType) => {
	// Connect to the database
	await db.connect()
	const isHuman = await verifyRecaptcha(testimonialPayload.recaptchaToken)
	if (!isHuman) throw new Error('Human verification failed')

	log.info('⬆️ Fetching createTestimonial', testimonialPayload)

	// Get the current session and check if the user is authenticated
	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if an testimonial with the same name already exists
	await checkTestimonialExists(testimonialPayload.name)

	// Create a new Testimonial object with the uploaded images
	const testimonial = new Testimonial(testimonialPayload)

	// Save the testimonial to the database
	await testimonial.save()
	log.success('✅ Fetched createTestimonial', testimonial)

	return docToJSON<ServerTestimonialType>(testimonial)
}

/**
 * Edits a testimonial with the provided ID using the form data
 * @param id - The ID of the testimonial to edit
 * @param testimonialPayload - The form data containing the testimonial information
 * @returns The edited testimonial
 */
export const editTestimonial = async (id: string, testimonialPayload: FormTestimonialType) => {
	// Connect to the database
	await db.connect()
	log.info('⬆️ Fetching editTestimonial', id)

	// Get the current session and check if the user is authenticated
	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if a testimonial with the same name already exists
	const existingTestimonialWithSameName = await Testimonial.findOne({
		name: testimonialPayload.name,
		_id: { $ne: id },
	})
	if (existingTestimonialWithSameName) throw new Error('Testimonial with the same name already exists')

	// Find the testimonial by ID
	const testimonial = await Testimonial.findById(id)
	if (!testimonial) throw new Error('Testimonial not found')

	// Update testimonial data with new images
	Object.assign(testimonial, testimonialPayload)

	// Save the updated testimonial
	await testimonial.save()

	log.success('✅ Fetched editTestimonial', id)

	return docToJSON<ServerTestimonialType>(testimonial)
}

/**
 * Deletes a testimonial by its ID.
 * Deletes all the testimonial's images from the cloudinary server.
 * @param id - The ID of the testimonial to delete.
 * @returns A Promise that resolves to true if the operation is successful.
 * @throws An error if the testimonial or the images cannot be deleted.
 */
export const deleteTestimonial = async (id: string) => {
	// Connect to the database
	await db.connect()
	log.info('⬆️ Fetching deleteTestimonial', id)

	// Find the testimonial by ID
	const testimonial = await Testimonial.findById(id)
	if (!testimonial) throw new Error('Testimonial not found')

	// Delete the testimonial
	await Testimonial.deleteOne({ _id: id }), // Delete the testimonial
		log.success('✅ Fetched deleteTestimonial', id)

	return true // Return true if the operation is successful
}

export const checkTestimonialExists = async (name: string | undefined) => {
	const existingTestimonial = await Testimonial.findOne({ name })
	if (existingTestimonial) {
		throw new Error('Testimonial already exists')
	}
}

export const getTestimonialCount = async () => {
	// Connect to the database
	await db.connect()

	const count = await Testimonial.countDocuments()
	return count
}
