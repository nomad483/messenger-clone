import { PropsWithChildren } from 'react'

import getUsers from '@/app/actions/getUsers'
import { Sidebar } from '@/app/components/sidebar/Sidebar'
import { UserList } from '@/app/users/components/userList'

export default async function UsersLayout({ children }: PropsWithChildren) {
  const users = await getUsers()
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <UserList items={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  )
}
