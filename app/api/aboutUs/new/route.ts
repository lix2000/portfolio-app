import { z } from 'zod'
import { AboutUs } from '@models'
import { NextRequest, NextResponse } from 'next/server'
import { AboutUsZodSchema } from '@types'
import { db } from '@lib'

export const POST = async (request: NextRequest) => {
	try {
		const body = await request.json()
		await db.connect()
		const aboutUsRecords = await Promise.all(
			[body].flat().map(async aboutUs => {
				const result = AboutUsZodSchema.parse(aboutUs)
				const dbService = await AboutUs.create(result)
				return dbService
			})
		)
		return NextResponse.json(aboutUsRecords)
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 422 })
		}

		return NextResponse.json({ error: error.message }, { status: 400 })
	}
}
