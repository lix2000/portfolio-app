import { ServerDesignerType } from '@types'
import { Model, Schema, model, models } from 'mongoose'
import { ImageSchema } from './subschemas'

const DesignerSchema = new Schema<ServerDesignerType>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: ImageSchema,
		required: true,
	},
})

const Designer: Model<ServerDesignerType> =
	models?.Designer || model<ServerDesignerType>('Designer', DesignerSchema)

export default Designer
