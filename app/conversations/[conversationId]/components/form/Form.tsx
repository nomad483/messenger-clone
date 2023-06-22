'use client'
import { FC } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'
import axios from 'axios'
import { CldUploadButton } from 'next-cloudinary'

import Routes from '@/app/components/routes'
import { MessageInput } from '@/app/conversations/[conversationId]/components/messageInput'
import useConversation from '@/app/hooks/useConversation'

export const Form: FC = () => {
  const { conversationId } = useConversation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true })
    axios
      .post(Routes.API_MESSAGES, {
        ...data,
        conversationId: conversationId,
      })
      .then()
  }

  const handleUpload = (result: any) => {
    axios.post(Routes.API_MESSAGES, {
      image: result?.info?.secure_url,
      conversationId,
    })
  }

  return (
    <div
      className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
      "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="o4v14kmj"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
            rounded-full
            p-2
            bg-sky-500
            cursor-pointer
            hover:bg-sky-600
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}
