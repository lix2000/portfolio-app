'use server'
import { db, docToJSON, getCurrentSession, log } from '@lib'
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
	await db.connect()
	log.info('⬇️ Fetching getPortfolios', options)

	const { page = 1, limit = 10 } = options || {}

	const offset = (page - 1) * limit

	const [portfolio, count] = await Promise.all([
		Portfolio.find({}).skip(offset).limit(limit).lean(),
		Portfolio.countDocuments(),
	])

	const pages = Math.ceil(count / limit)

	const hasMore = page < pages

	log.success('✅ Fetched getPortfolios')

	return { data: docToJSON<ServerPortfolioType[]>(portfolio), pages, page, hasMore }
}

/**
 * Retrieves a portfolio by its ID
 * @param id - The ID of the portfolio to retrieve
 * @returns The portfolio object
 * @throws An error if the portfolio does not exist
 */
export const getPortfolio = async (id: string) => {
	await db.connect()
	log.info('⬇️ Fetching getPortfolio', id)

	const portfolio = await Portfolio.findById(id)

	if (!portfolio) throw new Error('Portfolio not found')
	log.success('✅ Fetched getPortfolio', id)

	return docToJSON<ServerPortfolioType>(portfolio)
}

/**
 * Creates a new portfolio using the provided form data
 * @param portfolioPayload - The form data containing the portfolio information
 * @param imagesFormData - The form data containing the portfolio images
 * @returns The created portfolio object
 * @throws An error if the user is not authenticated or the portfolio already exists
 */
export const createPortfolio = async (portfolioPayload: PortfolioPayload, imagesFormData: FormData) => {
	await db.connect()
	log.info('⬆️ Fetching createPortfolio', portfolioPayload)

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

	log.success('✅ Fetched createPortfolio')

	return docToJSON<ServerPortfolioType>(portfolio)
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
	await db.connect()
	log.info('⬆️ Fetching editPortfolio', id)

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

	log.success('✅ Fetched editPortfolio', id)

	return docToJSON<ServerPortfolioType>(portfolio)
}

/**
 * Deletes a portfolio by its ID.
 * Deletes all the portfolio's images from the cloudinary server.
 * @param id - The ID of the portfolio to delete.
 * @returns A Promise that resolves to true if the operation is successful.
 * @throws An error if the portfolio or the images cannot be deleted.
 */
export const deletePortfolio = async (id: string) => {
	await db.connect()
	log.info('⬆️ Fetching deletePortfolio', id)

	const portfolio = await Portfolio.findById(id)
	if (!portfolio) throw new Error('Portfolio not found')

	const imageIds = portfolio.images.map(image => image.public_id)

	await Promise.all([Portfolio.deleteOne({ _id: id }), deleteFiles(imageIds)])

	log.success('✅ Fetched deletePortfolio', id)
	return true
}

/**
 * Checks if a portfolio with the same title already exists
 * @param title - The title of the portfolio to check
 * @throws An error if a portfolio with the same title already exists
 */
export const checkPortfolioExists = async (title: string | undefined) => {
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
	await db.connect()
	await connection.collection('portfolios').updateMany({}, newKeys)
}

/**
 * Returns the count of portfolios in the database
 * @returns The count of portfolios
 */
export const getPortfolioCount = async () => {
	await db.connect()
	log.info('⬆️ Fetching getPortfolioCount')

	const count = await Portfolio.countDocuments()

	log.success('✅ Fetched getPortfolioCount')

	return count
}
