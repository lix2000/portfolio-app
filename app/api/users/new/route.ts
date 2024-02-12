import { db } from '@lib'
import { User } from '@models'
import { UserType, UserZodSchema } from '@types'
import { hashPassword } from '@utils'
import { HydratedDocument } from 'mongoose'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		// Validate the request body
		const body = await request.json()
		const result = UserZodSchema.safeParse(body)
		if (!result.success) {
			return NextResponse.json({ error: result.error }, { status: 400 })
		}
		// Check if user already exists
		const { username, password } = result.data
		await db.connect()
		const existingUser = await User.findOne({ username })
		if (existingUser) {
			return NextResponse.json({ error: 'User already exists' }, { status: 400 })
		}
		// Create new user
		const user = new User({ username, password })
		user.password = await hashPassword(user.password)
		await user.save()

		return NextResponse.json(user)
	} catch (error: any) {
		throw new Error(`Failed to create user: ${error.message}`)
	}
}
