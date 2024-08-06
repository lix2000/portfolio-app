import { model, Model, models, Schema } from 'mongoose'
import { ImageSchema } from '@models/subschemas'
import { ServerPortfolioType } from '@types'

const PortfolioSchema = new Schema<ServerPortfolioType>({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	images: {
		type: [ImageSchema],
		required: true,
	},
})

const Portfolio: Model<ServerPortfolioType> =
	models?.Portfolio || model<ServerPortfolioType>('Portfolio', PortfolioSchema)

export default Portfolio
