import { useEffect, useState } from 'react';

import { useAuth } from '@/stores/auth';

type UsePermission = {
  moduleName?: string;
  policies?: string[];
  condition?: 'AND' | 'OR';
};

export const usePermission = ({
  moduleName,
  policies,
  condition = 'AND',
}: UsePermission) => {
  const { permissions } = useAuth();

  const [isAllow, setIsAllow] = useState(true);

  useEffect(() => {
    const handleCheck = () => {
      if (!moduleName || !policies || !permissions) {
        return;
      }

      const allow =
        condition === 'AND'
          ? policies.every((item) =>
              permissions?.[moduleName]?.includes(item)
            )
          : policies.some((item) =>
              permissions?.[moduleName]?.includes(item)
            );

      setIsAllow(allow);
    };

    handleCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleName, policies]);

  return {
    isAllow,
  };
};
