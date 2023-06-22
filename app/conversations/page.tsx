'use client'

import { FC } from 'react'
import clsx from 'clsx'

import { EmptyState } from '@/app/components/emptyState'
import useConversation from '@/app/hooks/useConversation'

const Home: FC = () => {
  const { isOpen } = useConversation()

  return (
    <div
      className={clsx('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  )
}

export default Home
