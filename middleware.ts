import { withAuth } from 'next-auth/middleware'

import Routes from '@/app/components/routes'

export default withAuth({
  pages: {
    signIn: '/',
  },
})

export const config = {
  matcher: [`/users/:path*`, `/conversations/:path*`],
}
