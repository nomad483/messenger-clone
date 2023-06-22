'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { Button } from '@/app/components/button'
import { Input, Select } from '@/app/components/input'
import { Modal } from '@/app/components/modal'
import useToggle from '@/app/hooks/useToggle'

interface Props {
  isOpen: boolean
  onClose: VoidFunction
  users: User[]
}

export const GroupChatModal = ({ isOpen, onClose, users }: Props) => {
  const [isLoading, toggleIsLoading] = useToggle()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  })

  const members = watch('members')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    toggleIsLoading()

    axios
      .post('/api/conversations', {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => toggleIsLoading())
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                label="Name"
                id="name"
                register={register}
                errors={errors}
                required
                disabled={isLoading}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue('members', value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  )
}
