import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getCurrentSession } from '@lib'
import { SessionProvider, Navbar, Footer, MobileNavbar } from '@components'
import '@lib/fontawesome'

import '@styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CSH Greenwich Advisory | Interior Designer',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getCurrentSession()

  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider session={session}>
          {/* <Navbar /> */}
          <MobileNavbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
