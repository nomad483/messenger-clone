import { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Routes } from '@/app/hooks/useRoutes'

type Props = Omit<Omit<Routes, 'handleClick'>, 'label'> & {
  onClick?: () => void
}

export const MobileItem: FC<Props> = ({
  onClick,
  active,
  icon: Icon,
  href,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick()
    }
  }

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        hover:text-black
        hover:bg-gray-100
      `,
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  )
}
