'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface AuthContextProps {
  children: ReactNode
}

export default function AuthContext({
  children,
}: AuthContextProps): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>
}
