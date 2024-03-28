import { z } from 'zod'
import { Service } from '@models'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceZodSchema } from '@types'
import { db } from '@lib'

export const POST = async (request: NextRequest) => {
	try {
		const body = await request.json()
		await db.connect()
		const services = await Promise.all(
			[body].flat().map(async service => {
				const result = ServiceZodSchema.parse(service)
				const dbService = await Service.create(result)
				return dbService
			})
		)
		return NextResponse.json(services)
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 422 })
		}

		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
