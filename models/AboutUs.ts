import { AboutUsType } from '@types'
import { Model, Schema, model, models } from 'mongoose'

const AboutUsSchema = new Schema<AboutUsType>({
	title: {
		type: String,
		required: true,
		unique: true,
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

const AboutUs: Model<AboutUsType> = models?.AboutUs || model<AboutUsType>('AboutUs', AboutUsSchema)

export default AboutUs
