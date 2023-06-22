'use client'

import { FC } from 'react'
import { User } from '@prisma/client'

import { Avatar } from '@/app/components/avatar'
import { DesktopItem } from '@/app/components/sidebar/DesktopItem'
import { SettingsModal } from '@/app/components/sidebar/SettingsModal'
import useRoutes from '@/app/hooks/useRoutes'
import useToggle from '@/app/hooks/useToggle'

type Props = {
  currentUser: User
}

export const DesktopSidebar: FC<Props> = ({ currentUser }) => {
  const routes = useRoutes()
  const [isOpen, toggleIsOpen] = useToggle()
  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={toggleIsOpen}
      />
      <div
        className="
        hidden
        lg:fixed
        ld:inset-y-0
        lg:left-0
        lg:z-40
        lg:w-20
        lg:px-6
        lg:overflow-y-auto
        lg:bg-white
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
        h-full
      "
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul
            role="list"
            className="
            flex
            flex-col
            items-center
            space-y-1
          "
          >
            {routes.map((route) => (
              <DesktopItem
                key={route.label}
                label={route.label}
                icon={route.icon}
                href={route.href}
                active={route.active}
                onClick={route.handleClick}
              />
            ))}
          </ul>
        </nav>
        <nav
          className="
          flex
          mt-4
          flex-col
          justify-between
          items-center
        "
        >
          <div
            onClick={() => toggleIsOpen()}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  )
}
