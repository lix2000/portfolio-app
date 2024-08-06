'use server'
import { db, getCurrentSession, log } from '@lib'
import { Article } from '@models'
import { deleteFiles, deleteFolder, upload } from '@actions'
import { CLOUDINARY_FOLDERS } from '@lib/settings'
import { FormArticleType, ServerArticleType } from '@types'
import { FilterQuery } from 'mongoose'
import { spaceToDash } from '@utils'

type ArticlePayload = Omit<FormArticleType, 'images'>

/**
 * Retrieves a list of articles from the database, optionally with pagination
 * @param options - Optional object with page, limit, and filter properties
 * @returns An object with the list of articles, number of pages, current page, and whether there are more pages
 */
export const getArticles = async (options?: {
	page?: number
	limit?: number
	filter?: FilterQuery<ServerArticleType>
}) => {
	log.success('getArticles', options)
	// Connect to the database
	await db.connect()

	const { page = 1, limit = 10, filter } = options || {}

	// Calculate the offset for pagination
	const offset = (page - 1) * limit

	// Retrieve the articles and count the number of documents that match the filter
	const [articles, count] = await Promise.all([
		Article.find(filter || {})
			.skip(offset)
			.limit(limit)
			.lean(),
		Article.countDocuments(filter),
	])

	// Calculate the number of pages
	const pages = Math.ceil(count / limit)

	// Determine whether there are more pages
	const hasMore = page < pages

	return { data: JSON.parse(JSON.stringify(articles)) as ServerArticleType[], pages, page, hasMore }
}

/**
 * Retrieves an article by its ID
 * @param id - The ID of the article to retrieve
 * @returns The article object
 * @throws An error if the article does not exist
 */
export const getArticle = async (id: string) => {
	log.warn('getArticle', id)
	// Connect to the database
	await db.connect()

	// Retrieve the article
	const article = await Article.findById(id)

	// Throw an error if the article does not exist
	if (!article) throw new Error('Article not found')
	log.success('getArticle', article)

	return article.toObject() as ServerArticleType
}

/**
 * Creates a new article using the provided form data
 * @param articlePayload - The form data containing the article information
 * @returns The created article object
 * @throws An error if the user is not authenticated or the article already exists
 */
export const createArticle = async (articlePayload: ArticlePayload, imagesFormData: FormData) => {
	log.warn('createArticle', articlePayload, imagesFormData)
	// Connect to the database
	await db.connect()

	// Get the current session and check if the user is authenticated
	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if an article with the same title already exists
	await checkArticleExists(articlePayload.title)

	// Retrieve the images from the form data
	const images = imagesFormData.getAll('images')

	// Upload the images to Cloudinary
	const uploadedImages = await upload(
		images as File[],
		`${CLOUDINARY_FOLDERS.ARTICLES}/${spaceToDash(articlePayload.title)}`
	)

	// Create a new Article object with the uploaded images
	const article = new Article({ ...articlePayload, images: uploadedImages })

	// Save the article to the database
	await article.save().catch(async (err: any) => {
		if (uploadedImages?.length) {
			// Delete the uploaded images and the folder if there are any
			await deleteFiles(uploadedImages.map(image => image.public_id))
			await deleteFolder(`${CLOUDINARY_FOLDERS.ARTICLES}/${spaceToDash(articlePayload.title)}`)
		}
		throw new Error(err)
	})
	log.success('createArticle', article)

	return article.toObject()
}

/**
 * Edits an article with the provided ID using the form data
 * @param id - The ID of the article to edit
 * @param articlePayload - The form data containing the article information
 * @returns The edited article
 */
export const editArticle = async (id: string, articlePayload: ArticlePayload, imagesFormData: FormData) => {
	log.success('editArticle', id, articlePayload, imagesFormData)
	// Connect to the database
	await db.connect()

	// Get the current session and check if the user is authenticated
	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	// Check if an article with the same title already exists
	const existingArticleWithSameTitle = await Article.findOne({
		title: articlePayload.title,
		_id: { $ne: id },
	})
	if (existingArticleWithSameTitle) throw new Error('Article with the same title already exists')

	// Extract new and existing images from the form data
	const newImages = imagesFormData.getAll('newImages') as unknown as File[]
	const existingFormImageIds = imagesFormData.getAll('existingImageIds') as string[]

	// Upload new images
	const uploadedImages = await upload(
		newImages,
		`${CLOUDINARY_FOLDERS.ARTICLES}/${spaceToDash(articlePayload.title)}`
	)

	// Find the article by ID
	const article = await Article.findById(id)
	if (!article) throw new Error('Article not found')

	// Identify deleted image IDs
	const deletedImageIds = article.images
		.map(image => image.public_id)
		.filter(imageId => !existingFormImageIds.includes(imageId))

	// Update article data with new images
	Object.assign(article, {
		...articlePayload,
		images: [
			...article.images.filter(image => existingFormImageIds.includes(image.public_id)),
			...uploadedImages,
		],
	})

	// Save the updated article
	await article
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

	return article.toObject()
}

/**
 * Deletes an article by its ID.
 * Deletes all the article's images from the cloudinary server.
 * @param id - The ID of the article to delete.
 * @returns A Promise that resolves to true if the operation is successful.
 * @throws An error if the article or the images cannot be deleted.
 */
export const deleteArticle = async (id: string) => {
	log.success('deleteArticle', id)
	// Connect to the database
	await db.connect()

	// Find the article by ID
	const article = await Article.findById(id)
	if (!article) throw new Error('Article not found')

	// Extract the image public IDs
	const imageIds = article.images.map(image => image.public_id)

	// Delete the article and all its images
	await Promise.all([
		Article.deleteOne({ _id: id }), // Delete the article
		deleteFiles(imageIds), // Delete the article's images
	])

	return true // Return true if the operation is successful
}

export const checkArticleExists = async (title: string | undefined) => {
	log.success('checkArticleExists', title)
	const existingArticle = await Article.findOne({ title })
	if (existingArticle) {
		throw new Error('Article already exists')
	}
}
