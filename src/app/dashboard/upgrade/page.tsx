import { auth } from '@/lib/auth'
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import UpgradeView from './UpgradeView'

type Props = {}

const UpgradePage = async (props: Props) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/sign-in")
  }


  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.premium.getCurrentSubcription.queryOptions(),
  )
  void queryClient.prefetchQuery(
    trpc.premium.getProducts.queryOptions(),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>TODO</p>}>
        <ErrorBoundary fallback={<p>TODO</p>}>
          <UpgradeView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default UpgradePage
