'use client'

import { FC, useMemo } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'

import { Avatar } from '@/app/components/avatar'
import { AvatarGroup } from '@/app/components/avatarGroup'
import Routes from '@/app/components/routes'
import { ProfileDrawer } from '@/app/conversations/[conversationId]/components/profileDrawer'
import useActiveList from '@/app/hooks/useActiveList'
import useOtherUser from '@/app/hooks/useOtherUser'
import useToggle from '@/app/hooks/useToggle'

interface Props {
  conversation: Conversation & {
    users: User[]
  }
}

export const Header: FC<Props> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen, toggleDrawerOpen] = useToggle(false)
  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser.email!) !== -1

  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.users.length} members`
    }

    return isActive ? 'Active' : 'Offline'
  }, [conversation, isActive])

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => toggleDrawerOpen()}
      />
      <div
        className="
        bg-white
        w-full
        flex
        border-b-[1px]
        sm:px-4
        py-3
        px-4
        lg:px-6
        justify-between
        items-center
        shadow-sm
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
            href={Routes.CONVERSATIONS}
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation?.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>
              <span>{conversation.name || otherUser.name}</span>
            </div>
            <div className="text-sm font-light text-neutral-500">
              <span>{statusText}</span>
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => toggleDrawerOpen()}
          className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
        />
      </div>
    </>
  )
}
