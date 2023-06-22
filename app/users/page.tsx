'use client'

import { FC } from 'react'

import { EmptyState } from '../components/emptyState'

const Users: FC = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full ">
      <EmptyState />
    </div>
  )
}

export default Users
