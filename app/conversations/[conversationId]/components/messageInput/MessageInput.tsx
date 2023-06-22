'use client'

import { FC, HTMLInputTypeAttribute } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface Props {
  id: string
  required?: boolean
  type?: HTMLInputTypeAttribute
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  placeholder?: string
}

export const MessageInput: FC<Props> = ({
  id,
  errors,
  placeholder,
  register,
  required,
  type = 'text',
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100
          w-full
          rounded-full
          focus:outline-none
        "
      />
    </div>
  )
}
