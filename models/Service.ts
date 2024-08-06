import { ServerServiceType } from '@types'
import { Model, Schema, model, models } from 'mongoose'
import { ImageSchema } from '@models/subschemas'

const ServiceSchema = new Schema<ServerServiceType>({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	price: {
		type: String,
		required: true,
	},
	priceDescription: {
		type: String,
	},
	images: {
		type: [ImageSchema],
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	isAdditionalService: {
		type: Boolean,
		required: true,
		default: false,
	},
})

const Service: Model<ServerServiceType> =
	models?.Service || model<ServerServiceType>('Service', ServiceSchema)

export default Service
