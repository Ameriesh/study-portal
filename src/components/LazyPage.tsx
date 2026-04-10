import { Suspense } from 'react';
import { PageLoader } from './PageLoader';

export function LazyPage({ page: Page }: { page: React.ComponentType }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  );
}