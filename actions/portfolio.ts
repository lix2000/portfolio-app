'use server'
import { db, getCurrentSession, log } from '@lib'
import { Portfolio } from '@models'
import { FormPortfolioType, ServerPortfolioType } from '@types'
import { deleteFiles, deleteFolder, upload } from '@actions'
import { CLOUDINARY_FOLDERS } from '@lib/settings'
import { spaceToDash } from '@utils'
import { connection } from 'mongoose'

/**
 * The payload for creating a new portfolio
 */
type PortfolioPayload = Omit<FormPortfolioType, 'images'>

/**
 * Retrieves a list of portfolios from the database, optionally with pagination
 * @param options - Optional object with page, limit
 * @returns An object with the list of portfolios, number of pages, current page, and whether there are more pages
 */
export const getPortfolios = async (options?: { page?: number; limit?: number }) => {
	log.success('getPortfolios', options)

	await db.connect()

	const { page = 1, limit = 10 } = options || {}

	const offset = (page - 1) * limit

	const [portfolio, count] = await Promise.all([
		Portfolio.find({}).skip(offset).limit(limit).lean(),
		Portfolio.countDocuments(),
	])

	const pages = Math.ceil(count / limit)

	const hasMore = page < pages

	return { data: JSON.parse(JSON.stringify(portfolio)) as ServerPortfolioType[], pages, page, hasMore }
}

/**
 * Retrieves a portfolio by its ID
 * @param id - The ID of the portfolio to retrieve
 * @returns The portfolio object
 * @throws An error if the portfolio does not exist
 */
export const getPortfolio = async (id: string) => {
	log.warn('getPortfolio', id)

	await db.connect()

	const portfolio = await Portfolio.findById(id)

	if (!portfolio) throw new Error('Portfolio not found')
	log.success('getPortfolio', portfolio)

	return portfolio.toObject() as ServerPortfolioType
}

/**
 * Creates a new portfolio using the provided form data
 * @param portfolioPayload - The form data containing the portfolio information
 * @param imagesFormData - The form data containing the portfolio images
 * @returns The created portfolio object
 * @throws An error if the user is not authenticated or the portfolio already exists
 */
export const createPortfolio = async (portfolioPayload: PortfolioPayload, imagesFormData: FormData) => {
	log.warn('createPortfolio', portfolioPayload, imagesFormData)

	await db.connect()

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if a portfolio with the same title already exists
	await checkPortfolioExists(portfolioPayload.title)

	const images = imagesFormData.getAll('images')

	const uploadedImages = await upload(
		images as File[],
		`${CLOUDINARY_FOLDERS.PORTFOLIO}/${spaceToDash(portfolioPayload.title)}`
	)

	const portfolio = new Portfolio({ ...portfolioPayload, images: uploadedImages })

	await portfolio.save().catch(async (err: any) => {
		if (uploadedImages?.length) {
			await deleteFiles(uploadedImages.map(image => image.public_id))
			await deleteFolder(`${CLOUDINARY_FOLDERS.PORTFOLIO}/${spaceToDash(portfolioPayload.title)}`)
		}
		throw new Error(err)
	})
	log.success('createPortfolio', portfolio)

	return portfolio.toObject() as ServerPortfolioType
}

/**
 * Edits a portfolio with the provided ID using the form data
 * @param id - The ID of the portfolio to edit
 * @param portfolioPayload - The form data containing the portfolio information
 * @param imagesFormData - The form data containing the portfolio images
 * @returns The edited portfolio
 */
export const editPortfolio = async (
	id: string,
	portfolioPayload: PortfolioPayload,
	imagesFormData: FormData
) => {
	log.success('editPortfolio', id, portfolioPayload, imagesFormData)

	await db.connect()

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if a portfolio with the same title already exists
	const existingPortfolioWithSameTitle = await Portfolio.findOne({
		title: portfolioPayload.title,
		_id: { $ne: id },
	})
	if (existingPortfolioWithSameTitle) throw new Error('Portfolio with the same title already exists')

	const newImages = imagesFormData.getAll('newImages') as unknown as File[]
	const existingFormImageIds = imagesFormData.getAll('existingImageIds') as string[]

	const uploadedImages = await upload(
		newImages,
		`${CLOUDINARY_FOLDERS.PORTFOLIO}/${spaceToDash(portfolioPayload.title)}`
	)

	const portfolio = await Portfolio.findById(id)
	if (!portfolio) throw new Error('Portfolio not found')

	// Delete the images that are not in the existing form data
	const deletedImageIds = portfolio.images
		.map(image => image.public_id)
		.filter(imageId => !existingFormImageIds.includes(imageId))

	Object.assign(portfolio, {
		...portfolioPayload,
		images: [
			...portfolio.images.filter(image => existingFormImageIds.includes(image.public_id)),
			...uploadedImages,
		],
	})

	await portfolio
		.save()
		.then(async () => {
			if (deletedImageIds.length) await deleteFiles(deletedImageIds)
		})
		.catch(async (err: any) => {
			if (uploadedImages?.length) await deleteFiles(uploadedImages.map(image => image.public_id))

			throw new Error(err)
		})

	return portfolio.toObject()
}

/**
 * Deletes a portfolio by its ID.
 * Deletes all the portfolio's images from the cloudinary server.
 * @param id - The ID of the portfolio to delete.
 * @returns A Promise that resolves to true if the operation is successful.
 * @throws An error if the portfolio or the images cannot be deleted.
 */
export const deletePortfolio = async (id: string) => {
	log.success('deletePortfolio', id)

	await db.connect()

	const portfolio = await Portfolio.findById(id)
	if (!portfolio) throw new Error('Portfolio not found')

	const imageIds = portfolio.images.map(image => image.public_id)

	await Promise.all([Portfolio.deleteOne({ _id: id }), deleteFiles(imageIds)])

	return true
}

/**
 * Checks if a portfolio with the same title already exists
 * @param title - The title of the portfolio to check
 * @throws An error if a portfolio with the same title already exists
 */
export const checkPortfolioExists = async (title: string | undefined) => {
	log.success('checkPortfolioExists', title)
	const existingPortfolio = await Portfolio.findOne({ title })
	if (existingPortfolio) {
		throw new Error('Portfolio already exists')
	}
}

/**
 * Updates all portfolios in the development environment
 * @param newKeys - The new keys to update the portfolios with
 */
export const updatePortfoliosDev = async (newKeys: any) => {
	log.success('updatePortfoliosDev', newKeys)
	await db.connect()
	await connection.collection('portfolios').updateMany({}, newKeys)
}

/**
 * Returns the count of portfolios in the database
 * @returns The count of portfolios
 */
export const getPortfolioCount = async () => {
	await db.connect()
	const count = await Portfolio.countDocuments()

	return count
}
