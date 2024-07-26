import { ImageType } from '@types'
import { Schema } from 'mongoose'

export const ImageSchema = new Schema<ImageType>({
	public_id: {
		type: String,
	},
	version: {
		type: Number,
	},
	signature: {
		type: String,
	},
	width: {
		type: Number,
	},
	height: {
		type: Number,
	},
	format: {
		type: String,
	},
	resource_type: {
		type: String,
	},
	created_at: {
		type: String,
	},
	bytes: {
		type: Number,
	},
	type: {
		type: String,
	},
	url: {
		type: String,
	},
	secure_url: {
		type: String,
	},
})
