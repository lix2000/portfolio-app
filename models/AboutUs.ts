import { ServerAboutUsType } from '@types'
import { Model, Schema, model, models } from 'mongoose'
import { ImageSchema } from './subschemas'

const AboutUsSchema = new Schema<ServerAboutUsType>({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	images: {
		type: [ImageSchema],
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
})

const AboutUs: Model<ServerAboutUsType> =
	models?.AboutUs || model<ServerAboutUsType>('AboutUs', AboutUsSchema)

export default AboutUs
