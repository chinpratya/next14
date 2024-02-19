import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { IconSchema } from '../schemas/icon';
import { Icon } from '../types/icon';

export const listIcon = async (): Promise<Icon[]> => {
  const { data } = await apiClient.get(`/icon`, {
    baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
  });

  return z.array(IconSchema).parse(data);
};

export const useListIcon = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [complianceQueryKeys.icon.all],
      queryFn: listIcon,
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
  };
};
