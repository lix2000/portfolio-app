import { model, Model, models, Schema } from 'mongoose'
import { ServerAppointmentType } from '@types'
import { ImageSchema } from '@models/subschemas'

const AppointmentSchema = new Schema<ServerAppointmentType>(
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
			type: Date,
			required: true,
		},
		service: {
			type: String,
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
	},
	{ timestamps: true }
)

const Appointment: Model<ServerAppointmentType> =
	models?.Appointment || model<ServerAppointmentType>('Appointment', AppointmentSchema)

export default Appointment
