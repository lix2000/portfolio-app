import type { Metadata } from 'next'
import { Questrial } from 'next/font/google'
import { getCurrentSession } from '@lib'
import {
	SessionProvider,
	Navbar,
	Footer,
	ReactQueryClientProvider,
	GoogleReCaptchaWrapper,
	Toaster,
} from '@components'
import '@lib/fontawesome'

import '@styles/globals.css'

const questrial = Questrial({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'CSH Greenwich Advisory | Interior Designer',
	description: 'Interior Design | Project Management | Real Estate',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const session = await getCurrentSession()

	return (
		<html lang='en'>
			<body className={questrial.className}>
				<GoogleReCaptchaWrapper>
					<ReactQueryClientProvider>
						<SessionProvider session={session}>
							<Toaster />
							<Navbar />
							{children}
							<Footer />
						</SessionProvider>
					</ReactQueryClientProvider>
				</GoogleReCaptchaWrapper>
			</body>
		</html>
	)
}
