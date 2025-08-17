import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';
import { ClientGreeting } from './client-greeting';
import { Card, CardContent } from '@/components/ui/card';

type Props = {}

const TRPCPreFetch = (props: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      text: "Arnold" // Text might be the same on the ClientGreeting
    }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Card>
        <CardContent>
          <div>Static Content...</div>
          <div className='flex gap-8'>Client Content...
            <ClientGreeting />
          </div>
        </CardContent>
      </Card>
    </HydrationBoundary>
  );
}

export default TRPCPreFetch
