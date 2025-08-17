import { Card, CardContent } from '@/components/ui/card';
import { caller, getQueryClient, HydrateClient, trpc } from '@/trpc/server';
import { ClientGreeting } from './client-greeting';

export default async function ServerPreFetch() {
  const queryClient = getQueryClient();
  const greeting = await queryClient.fetchQuery(trpc.hello.queryOptions({ text: "Arnold" }));

  const greetingServer = await caller.hello({ text: "Arnold" });
  // Do something with greeting on the server
  return (
    <HydrateClient>
      <Card>
        <CardContent>
          <div>Static Content...</div>
          <div className='flex gap-8'>Server Prefetch Content...
            <ClientGreeting />
          </div>
          <div>
            {greeting.greeting} From Query Client
          </div>
          <div>
            {greetingServer.greeting} From Server Caller
          </div>
        </CardContent>
      </Card>
    </HydrateClient>
  );
}
