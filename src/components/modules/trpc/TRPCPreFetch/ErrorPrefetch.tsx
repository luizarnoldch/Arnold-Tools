import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Card, CardContent } from '@/components/ui/card';
import { ClientGreetingErrorFetch } from './client-greeting-error-fetch';

export default async function ErrorPrefetch() {
  prefetch(trpc.hello.queryOptions({ text: "Arnold" }));
  return (
    <HydrateClient>
      <Card>
        <CardContent>
          <div>Static Content...</div>
          <div className='flex gap-8'>Client Content...
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <Suspense fallback={<div>Loading...</div>}>
                <ClientGreetingErrorFetch />
              </Suspense>
            </ErrorBoundary>
          </div>
        </CardContent>
      </Card>
    </HydrateClient>
  );
}
