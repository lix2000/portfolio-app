'use server'
import { revalidatePath } from 'next/cache'

export const clearCache = async (path?: string) => {
	try {
		if (path) {
			revalidatePath(path)
		} else {
			revalidatePath('/')
		}
	} catch (error) {
		console.error('clearCachesByServerAction=> ', error)
	}
}
