import { ServerTestimonialType } from '@types'
import { Model, Schema, model, models } from 'mongoose'

const TestimonialSchema = new Schema<ServerTestimonialType>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
	},
	{ timestamps: true }
)

const Testimonial: Model<ServerTestimonialType> =
	models?.Testimonial || model<ServerTestimonialType>('Testimonial', TestimonialSchema)

export default Testimonial
