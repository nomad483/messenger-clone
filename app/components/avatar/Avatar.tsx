'use client'

import { FC } from 'react'
import { User } from '@prisma/client'
import Image from 'next/image'

import useActiveList from '@/app/hooks/useActiveList'

interface Props {
  user?: User
}

export const Avatar: FC<Props> = ({ user }) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(user?.email as string) !== -1

  return (
    <div className="relative">
      <div
        className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
        "
      >
        <Image
          src={user?.image || '/images/placeholder.jpg'}
          alt="Avatar"
          fill
        />
      </div>

      {isActive && (
        <span
          className="
          absolute
          block
          rounded-full
          bg-green-500
          ring-2
          ring-white
          top-0
          right-0
          w-2
          h-2
          md:h-3
          md:w-3
        "
        />
      )}
    </div>
  )
}
