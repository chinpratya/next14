import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { notifySchema } from '../schemas';
import { Notify } from '../types';

export const getNotify = async (
  notifyId: string
): Promise<Notify> => {
  const { data } = await apiClient.get(
    `/core/notify/${notifyId}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return notifySchema.parse(data);
};

export const useGetNotify = (notifyId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getNotify(notifyId),
      queryKey: [coreQueryKeys.notify.detail(notifyId)],
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
  };
};
