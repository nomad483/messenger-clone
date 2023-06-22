'use client'
import { FC } from 'react'
import clsx from 'clsx'
import { format } from 'date-fns'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { Avatar } from '@/app/components/avatar'
import { ImageModal } from '@/app/conversations/[conversationId]/components/imageModal'
import useToggle from '@/app/hooks/useToggle'
import { FullMessageType } from '@/app/types'

interface Props {
  isLast: boolean
  data: FullMessageType
}

export const MessageBox: FC<Props> = ({ isLast, data }) => {
  const session = useSession()
  const [imageModalOpen, toggleImageModalOpen] = useToggle()

  const isOwn = session?.data?.user?.email === data?.sender?.email
  const seenList = (data?.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ')

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end')
  const avatar = clsx(isOwn && 'order-2')
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end')
  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    data?.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  )

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            <span>{data.sender.name}</span>
          </div>
          <div className="text-xs text-gray-400">
            <span>{format(new Date(data.createdAt), 'p')}</span>
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={toggleImageModalOpen}
          />
          {data.image ? (
            <Image
              onClick={toggleImageModalOpen}
              alt="Image"
              height={288}
              width={288}
              src={data.image}
              className="
                object-cover
                cursor-pointer
                hover:scale-110
                transition
                translate
              "
            />
          ) : (
            <span>{data.body}</span>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  )
}
