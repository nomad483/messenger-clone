'use client'

import Image from 'next/image'

import { Modal } from '@/app/components/modal'

interface Props {
  src?: string | null
  isOpen: boolean
  onClose: VoidFunction
}
export const ImageModal = ({ src, isOpen, onClose }: Props) => {
  if (!src) {
    return <></>
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="w-80 h-80 ">
        <Image src={src} alt="Image" fill className="object-cover" />
      </div>
    </Modal>
  )
}
