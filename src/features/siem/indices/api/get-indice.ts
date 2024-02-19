import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';

import { IndiceDetailSchema } from '../schemas';
import { IndiceDetail } from '../types';

export const getIndice = async (
  indiceId: string
): Promise<IndiceDetail> => {
  const response = await apiClient.get(
    `/log/indices/${indiceId}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return IndiceDetailSchema.parse(response.data);
};

export const useGetIndice = (indiceId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getIndice(indiceId),
      queryKey: [logQueryKeys.indices.detail(indiceId)],
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
  };
};
