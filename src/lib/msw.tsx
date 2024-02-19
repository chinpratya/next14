// import { MSWDevTools } from 'msw-devtools';
import { ReactNode } from 'react';

// import { IS_MSW_DEVTOOLS_ENABLED } from '@/config/constants';
// import { db, handlers } from '@/testing/mocks';

export type MSWWrapperProps = {
  children: ReactNode;
};

require('@/testing/mocks/initialize');

export const MSWWrapper = ({
  children,
}: MSWWrapperProps) => {
  return (
    <>
      {/* {IS_MSW_DEVTOOLS_ENABLED && (
        <MSWDevTools db={db} handlers={handlers} />
      )} */}
      {children}
    </>
  );
};

// notes:
// - close comment to use MSWDevTools
// - rollback to previous comment before commit this file
