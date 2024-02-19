import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { PurposeHistoryResponseSchema } from '../schemas';
import { PurposeHistoryResponse } from '../types';

export type ListPurposeHistory = Request & {
  purposeId: string;
};

export const listPurposeHistory = async ({
  purposeId,
  ...params
}: ListPurposeHistory): Promise<PurposeHistoryResponse> => {
  const response = await apiClient.get(
    `/purpose/${purposeId}/history`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return PurposeHistoryResponseSchema.parse(response);
};

export type UseListPurposeHistory = ListPurposeHistory;

export const useListPurposeHistory = ({
  purposeId,
  ...params
}: UseListPurposeHistory) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryFn: () =>
        listPurposeHistory({ purposeId, ...params }),
      queryKey: [
        dataMappingQueryKeys.purpose.history(purposeId),
        { ...params },
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
