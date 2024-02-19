import { useEffect, useState } from 'react';

import { useAuth } from '@/stores/auth';

export type UseAccessModule = {
  access?: string;
};

export const useAccessModule = ({
  access,
}: UseAccessModule) => {
  const { accessModule } = useAuth();
  const [isAccess, setIsAccess] = useState(true);

  useEffect(() => {
    const handleCheck = () => {
      if (!access || !accessModule) {
        return;
      }

      const allow = accessModule.includes(access);

      setIsAccess(allow);
    };

    handleCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessModule, access]);

  return {
    isAccess,
  };
};
