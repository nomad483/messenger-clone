'use client'

import { FC } from 'react'

import { MobileItem } from '@/app/components/sidebar/MobileItem'
import useConversation from '@/app/hooks/useConversation'
import useRoutes from '@/app/hooks/useRoutes'

export const MobileFooter: FC = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) {
    return null
  }

  return (
    <div
      className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
      "
    >
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          icon={route.icon}
          href={route.href}
          active={route.active}
          onClick={route.handleClick}
        />
      ))}
    </div>
  )
}
