import { DefaultSession, getServerSession, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db, isPasswordValid, log } from '@lib'
import { User } from '@models'

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 Days
	},
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'credentials',
			authorize,
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'Username' },
				password: { label: 'Password', type: 'password', placeholder: 'Password' },
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			log.info('Auth: Session callback')
			session.user = token.user as DefaultSession['user']
			return session
		},
		async jwt({ token, user }) {
			log.info('Auth: JWT callback')
			if (user) {
				token.user = user
			}
			return token
		},
	},
}

export async function getCurrentSession() {
	log.info('Auth: Getting current session')
	const session = await getServerSession(authOptions)

	return session
}

async function authorize(credentials: Record<'username' | 'password', string> | undefined) {
	log.info('Auth: Authorize function')
	const { username, password } = credentials || {}
	if (!username || !password) {
		log.warn('Auth: No username or password provided')
		return null
	}

	try {
		await db.connect()
		const user = await User.findOne({ username })

		if (!user) {
			log.warn(`Auth: User with username ${username} not found`)
			return null
		}

		const isValidPassword = await isPasswordValid(password, user.password)

		if (!isValidPassword) {
			log.warn(`Auth: Invalid password for user with username ${username}`)
			return null
		}

		return { id: user._id, name: user.username }
	} catch (error: any) {
		log.error(`Auth: Failed to authenticate user: ${error.message}`)
		throw new Error(`Failed to authenticate user: ${error.message}`)
	}
}
