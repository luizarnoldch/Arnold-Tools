import { Card, CardContent } from '@/components/ui/card'
import { caller } from '@/trpc/server'

type Props = {}

const TRPCServerComponent = async (props: Props) => {
  const data = await caller.hello({ text: "Arnold" })

  return (
    <Card>
      <CardContent>
        {data.greeting} from server
      </CardContent>
    </Card>
  )
}

export default TRPCServerComponent
