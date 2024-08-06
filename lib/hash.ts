import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
	const hashedPassword = await bcrypt.hash(password, 12)
	return hashedPassword
}

export async function isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
	const isValid = await bcrypt.compare(password, hashedPassword)
	return isValid
}
