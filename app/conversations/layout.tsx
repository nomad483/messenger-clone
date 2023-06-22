import { PropsWithChildren } from 'react'

import getConversations from '@/app/actions/getConversations'
import getUsers from '@/app/actions/getUsers'
import { Sidebar } from '@/app/components/sidebar/Sidebar'
import { ConversationList } from '@/app/conversations/components/conversationList'

export default async function ConversationLayout({
  children,
}: PropsWithChildren) {
  const conversations = await getConversations()
  const users = await getUsers()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  )
}
