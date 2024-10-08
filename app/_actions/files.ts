'use server'
import { cloudinary } from '@lib'
import { UploadApiResponse } from 'cloudinary'

export const upload = async (files: File[], folder?: string): Promise<UploadApiResponse[]> => {
	const uploads = files.map(async file => {
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		return new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ folder }, (error, result) => {
					if (error) {
						reject(error)
						return
					}
					resolve(result)
				})
				.end(buffer)
		})
	})

	return (await Promise.all(uploads)) as UploadApiResponse[]
}

export const deleteFiles = async (publicIds: string[]) => await cloudinary.api.delete_resources(publicIds)

export const deleteFolder = async (folder: string) => await cloudinary.api.delete_folder(folder)
