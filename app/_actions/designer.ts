'use server'
import { Designer } from '@models'
import { deleteFiles, upload } from '@actions'
import { CLOUDINARY_FOLDERS } from '@lib/settings'
import { FormDesignerType, ServerDesignerType } from '@types'
import { db, docToJSON, getCurrentSession, log } from '@lib'

type DesignerPayload = Omit<FormDesignerType, 'image'>

export const createOrEditDesigner = async (formData: DesignerPayload, imagesFormData: FormData) => {
	await db.connect()
	log.info('⬆️ Fetching createOrEditDesigner')

	const session = await getCurrentSession()
	if (!session?.user) throw new Error('Unauthorized')

	const newImages = imagesFormData.getAll('image') as unknown as File[]
	const uploadedImages = !!newImages.length ? await upload(newImages, CLOUDINARY_FOLDERS.DESIGNER) : null

	const data = {
		...formData,
		image: uploadedImages?.length ? uploadedImages[0] : undefined,
	}

	const [designer] = (await Designer.find({})) || []
	const imageToDelete = !!uploadedImages?.length ? designer?.image?.public_id : null
	if (!designer) {
		const newDesigner = new Designer(data)
		await newDesigner.save()

		return docToJSON<ServerDesignerType>(newDesigner)
	}
	await designer.updateOne(data)
	if (imageToDelete) {
		await deleteFiles([imageToDelete])
	}

	log.success('✅ Fetched createOrEditDesigner')

	return docToJSON<ServerDesignerType>(designer)
}

export const getDesigner = async () => {
	await db.connect()
	log.info('⬇️ Fetching getDesigner')
	const [designer] = await Designer.find({})

	log.success('✅ Fetched getDesigner')
	return !!designer ? docToJSON<ServerDesignerType>(designer) : null
}
