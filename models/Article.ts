import { ServerArticleType } from '@types'
import { Model, Schema, model, models } from 'mongoose'
import { ImageSchema } from './subschemas'

const ArticleSchema = new Schema<ServerArticleType>({
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

const Article: Model<ServerArticleType> =
	models?.Article || model<ServerArticleType>('Article', ArticleSchema)

export default Article
