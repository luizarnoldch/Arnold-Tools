"use client"

import { Card, CardContent } from '@/components/ui/card'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'

type Props = {}

const TRPCClientComponent = (props: Props) => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Arnold" }))

  return (
    <Card>
      <CardContent>
        {data?.greeting} from client
      </CardContent>
    </Card>
  )
}

export default TRPCClientComponent
