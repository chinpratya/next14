import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

type ListPermission = {
  productName?: string;
  moduleName?: string;
  onlyAccessModule?: boolean;
};

export const listPermission = async ({
  productName,
  moduleName,
  onlyAccessModule = false,
}: ListPermission): Promise<Record<string, string[]>> => {
  const { data } = await apiClient.get(
    `/user/auth/permission`,
    {
      params: {
        productName,
        moduleName,
        onlyAccessModule,
      },
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return data;
};

type UseListPermission = ListPermission & {
  enabled?: boolean;
};

export const useListPermission = ({
  moduleName,
  productName,
  enabled = true,
  onlyAccessModule = false,
}: UseListPermission) => {
  const { data, isFetching, isError } = useQuery({
    queryFn: () =>
      listPermission({
        moduleName,
        productName,
        onlyAccessModule,
      }),
    queryKey: [
      adminQueryKeys.user.permissions(
        moduleName,
        productName,
        onlyAccessModule
      ),
    ],
    enabled,
  });

  return {
    data,
    isLoading: isFetching,
    isError,
  };
};
