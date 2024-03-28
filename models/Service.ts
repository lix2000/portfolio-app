import { ServiceType } from '@types'
import { Model, Schema, model, models } from 'mongoose'

const ServiceSchema = new Schema<ServiceType>({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	price: {
		type: Number,
		required: true,
	},
	images: {
		type: [String],
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	longDescription: {
		type: String,
		required: true,
	},
})

const Service: Model<ServiceType> = models?.Service || model<ServiceType>('Service', ServiceSchema)

export default Service
