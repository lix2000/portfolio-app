import mongoose from 'mongoose'
import { log } from '@lib'

const MONGODB_URI = process.env.MONGODB_URI!

//@ts-ignore
let cached = global.mongoose

if (!cached) {
	//@ts-ignore
	cached = global.mongoose = { conn: null, promise: null }
}

async function connect() {
	if (cached.conn) {
		log.success('Connection to db already established')
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}

		log.info('Connecting to db...')

		cached.promise = mongoose
			.connect(MONGODB_URI, opts)
			.then(mongoose => {
				log.success('Connected to db')
				return mongoose
			})
			.catch(err => {
				log.error('Error connecting to db:', err)
				throw err
			})
	}

	cached.conn = await cached.promise
	return cached.conn
}

async function disconnect() {
	log.info('Disconnecting from db...')
	await mongoose.disconnect()
	log.success('Disconnected from db')
}

const db = { connect, disconnect }
export default db
