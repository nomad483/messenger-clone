'use client'
import { FC, useCallback } from 'react'
import toast from 'react-hot-toast'
import { FiAlertTriangle } from 'react-icons/fi'
import { Dialog } from '@headlessui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { Button } from '@/app/components/button'
import { Modal } from '@/app/components/modal'
import Routes from '@/app/components/routes'
import useConversation from '@/app/hooks/useConversation'
import useToggle from '@/app/hooks/useToggle'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ConfirmModal: FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { conversationId } = useConversation()
  const [isLoading, toggleIsLoading] = useToggle()

  const onDelete = useCallback(() => {
    toggleIsLoading()

    axios
      .delete(`${Routes.API_CONVERSATIONS}/${conversationId}`)
      .then(() => {
        onClose()
        router.push(Routes.CONVERSATIONS)
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(toggleIsLoading)
  }, [conversationId, onClose, router, toggleIsLoading])

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="sm:flex sm:items-start">
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-full
            bg-red-100
            sm:mx-0
            sm:h-10
            sm:w-10
          "
        >
          <FiAlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button danger disabled={isLoading} onClick={onDelete}>
          Delete
        </Button>
        <Button secondary disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}
