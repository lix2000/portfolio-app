import { model, Model, models, Schema, Types } from 'mongoose'
import { ServerRequestType } from '@types'
import { ImageSchema } from '@models/subschemas'

const RequestSchema = new Schema<ServerRequestType>(
	{
		fullName: {
			type: String,
			required: true,
			minlength: 3,
		},
		email: {
			type: String,
			required: true,
			match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		},
		description: {
			type: String,
			required: true,
			minlength: 3,
		},
		termsAndConditions: {
			type: Boolean,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		service: {
			type: Types.ObjectId,
			ref: 'Service',
			required: true,
		},
		budget: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			match: /^\+?[0-9]+$/,
		},
		images: {
			type: [ImageSchema],
			required: true,
		},
		isViewed: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
)

const Request: Model<ServerRequestType> =
	models?.Request || model<ServerRequestType>('Request', RequestSchema)

export default Request
