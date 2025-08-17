import TRPCClientComponent from '@/components/modules/trpc/TRPCClientComponent'
import TRPCPreFetch from '@/components/modules/trpc/TRPCPreFetch'
import ErrorPrefetch from '@/components/modules/trpc/TRPCPreFetch/ErrorPrefetch'
import ReusablePreFetch from '@/components/modules/trpc/TRPCPreFetch/ReusablePreFetch'
import ServerPreFetch from '@/components/modules/trpc/TRPCPreFetch/ServerPreFetch'
import TRPCServerComponent from '@/components/modules/trpc/TRPCServerComponent'
import React from 'react'

type Props = {}

const TRPCPage = (props: Props) => {
  return (
    <div className='flex flex-col p-4 gap-8'>
      <TRPCClientComponent />
      <TRPCServerComponent />
      <TRPCPreFetch />
      <ReusablePreFetch />
      <ErrorPrefetch />
      <ServerPreFetch />
    </div>
  )
}

export default TRPCPage
