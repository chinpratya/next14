import { useSetState } from '@mantine/hooks';
import { useEffect } from 'react';

import { listPermission } from '@/features/shared';
import { authStore, useAuth } from '@/stores/auth';

type UseAppPermission = {
  moduleName?: string[];
  productName?: string;
  condition?: 'AND' | 'OR';
  policies?: string[];
};

export const useAppPermission = ({
  moduleName,
  productName,
  condition = 'AND',
  policies = [],
}: UseAppPermission) => {
  const { permissions, access_token } = useAuth();

  const [state, setState] = useSetState({
    isLoading: false,
    isAllow: true,
    isError: false,
  });

  useEffect(() => {
    const handleCheck = async () => {
      try {
        if (!moduleName || !productName || !policies) {
          return;
        }

        const [key] = moduleName;

        if (!permissions || !permissions?.[key]) {
          setState({ isLoading: true });

          const response = await listPermission({
            productName: productName,
            moduleName: moduleName.join(','),
          });

          const isAllow =
            condition === 'AND'
              ? policies.every((item) =>
                  response[key].includes(item)
                )
              : policies.some((item) =>
                  response[key].includes(item)
                );

          authStore.setState({
            permissions: {
              ...permissions,
              ...response,
            },
          });

          setState({ isLoading: false, isAllow });

          return;
        }

        const isAllow =
          condition === 'AND'
            ? policies.every((item) =>
                permissions?.[key].includes(item)
              )
            : policies.some((item) =>
                permissions?.[key].includes(item)
              );

        setState({ isAllow });
      } catch (error) {
        setState({ isError: true });
      } finally {
        setState({ isLoading: false });
      }
    };

    if (access_token) handleCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleName, productName]);

  return {
    isLoading: state.isLoading,
    isAllow: state.isAllow,
    isError: state.isError,
  };
};
