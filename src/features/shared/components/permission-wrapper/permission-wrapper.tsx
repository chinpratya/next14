import { ReactNode } from 'react';

import { useAuth } from '@/stores/auth';

type PermissionWrapperProps = {
  policies: string[];
  children: ReactNode;
  moduleName: string;
};

export const PermissionWrapper = ({
  moduleName,
  children,
  policies,
}: PermissionWrapperProps) => {
  const auth = useAuth();

  moduleName = moduleName === 'lm' ? 'log' : moduleName;

  const listPermission =
    auth?.permissions?.[moduleName] ?? [];

  const isAllow = policies.some((item) =>
    listPermission.includes(item)
  );

  if (!isAllow) return null;

  return <>{children}</>;
};
