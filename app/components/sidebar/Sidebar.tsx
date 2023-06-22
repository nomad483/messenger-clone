import { PropsWithChildren } from 'react'

import getCurrentUser from '@/app/actions/getCurrentUser'
import { DesktopSidebar } from '@/app/components/sidebar/DesktopSidebar'
import { MobileFooter } from '@/app/components/sidebar/MobileFooter'

export async function Sidebar(props: PropsWithChildren) {
  const currentUser = await getCurrentUser()

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{props?.children ?? ''}</main>
    </div>
  )
}
