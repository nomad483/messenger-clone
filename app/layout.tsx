import { ReactNode } from 'react'
import { Inter } from 'next/font/google'

import './globals.css'

import AuthContext from '@/app/context/AuthContext'
import ToasterContext from '@/app/context/ToasterContext'
import { ActiveStatus } from '@/app/components/active-status'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Messenger Clone',
  description: 'Messenger clone app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
