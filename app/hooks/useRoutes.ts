import { useMemo } from 'react'
import { IconType } from 'react-icons'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

import EnumRoutes from '@/app/components/routes'

import useConversation from './useConversation'

export interface Routes {
  label: string
  href: string
  icon: IconType
  handleClick?: () => void
  active?: boolean
}

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  return useMemo<Routes[]>(
    () => [
      {
        label: 'Chat',
        href: EnumRoutes.CONVERSATIONS,
        icon: HiChat,
        active: pathname === EnumRoutes.CONVERSATIONS || !!conversationId,
      },
      {
        label: 'Users',
        href: EnumRoutes.USERS,
        icon: HiUsers,
        active: pathname === EnumRoutes.USERS,
      },
      {
        label: 'Logout',
        href: '#',
        handleClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  )
}

export default useRoutes
