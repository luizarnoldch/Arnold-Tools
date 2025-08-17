import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import { ClientGreeting } from './client-greeting';
import { Card, CardContent } from '@/components/ui/card';

const ReusablePreFetch = () => {
  prefetch(
    trpc.hello.queryOptions({
      text: "Arnold"
    }),
  );
  return (
    <HydrateClient>
      <Card>
        <CardContent>
          <div>Static Content...</div>
          <div className='flex gap-8'>Client Content...
            <ClientGreeting />
          </div>
        </CardContent>
      </Card>
    </HydrateClient>
  );
}

export default ReusablePreFetch
