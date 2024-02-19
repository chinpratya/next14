import '@testing-library/jest-dom/extend-expect';

import { queryClient } from '@/lib/react-query';
import { seedDb } from '@/testing/mocks/seed-db';
import { server } from '@/testing/mocks/server';

before(() => {
  server.listen({ onUnhandledRequest: 'error' });
  seedDb();
});

afterEach(async () => {
  queryClient.clear();
  server.resetHandlers();
});
