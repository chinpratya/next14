import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { PurposeSchema } from '../schemas';
import { Purpose } from '../types';

export const getPurposeDetail = async (
  purposeId: string
): Promise<Purpose> => {
  const response = await apiClient.get(
    `/purpose/${purposeId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return PurposeSchema.parse(response.data);
};

export const useGetPurposeDetail = (
  purposeId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.purpose.detail(purposeId),
      ],
      queryFn: () => getPurposeDetail(purposeId),
      enabled: !!purposeId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
