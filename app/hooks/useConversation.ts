import { useMemo } from 'react'
import { useParams } from 'next/navigation'

const useConversation = () => {
  const params = useParams()

  const conversationId = useMemo(
    () => (params?.conversationId ? (params.conversationId as string) : ''),
    [params?.conversationId]
  )

  const isOpen = useMemo(() => !!conversationId, [conversationId])

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  )
}

export default useConversation
