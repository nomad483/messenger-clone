'use client'
import { FC } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { User } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CldUploadButton } from 'next-cloudinary'

import { Button } from '@/app/components/button'
import { Input } from '@/app/components/input'
import { Modal } from '@/app/components/modal'
import routes from '@/app/components/routes'
import useToggle from '@/app/hooks/useToggle'

interface Props {
  currentUser: User
  isOpen: boolean
  onClose: () => void
}

export const SettingsModal: FC<Props> = ({ currentUser, onClose, isOpen }) => {
  const router = useRouter()
  const [isLoading, toggleIsLoading] = useToggle()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  })

  const image = watch('image')

  // @ts-ignore
  const handleUpload = (result) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    toggleIsLoading()

    axios
      .post(routes.API_SETTINGS, data)
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => toggleIsLoading())
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information
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
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    src={
                      image || currentUser?.image || '/images/placeholder.jpg'
                    }
                    alt="Avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="o4v14kmj"
                  >
                    <Button disabled={isLoading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
