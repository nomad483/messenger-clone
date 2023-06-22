import prisma from '@/app/libs/prismadb'

const getMessages = async (conversationId: string) => {
  try {
    return await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  } catch (e) {
    console.error(e, 'error_getMessages')
    return []
  }
}

export default getMessages
