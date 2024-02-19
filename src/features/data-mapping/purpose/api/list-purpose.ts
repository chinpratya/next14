import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { PurposeResponseSchema } from '../schemas';
import { PurposeResponse } from '../types';

export type ListPurpose = Request & {
  status?: string;
  tagID?: string;
};

export const listPurpose = async ({
  status,
  tagID,
  ...params
}: ListPurpose): Promise<PurposeResponse> => {
  const response = await apiClient.get(`/purpose`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params: {
      status,
      tagID,
      ...params,
    },
  });

  return PurposeResponseSchema.parse(response);
};

export type UseListPurpose = ListPurpose;

export const useListPurpose = ({
  status,
  tagID,
  ...params
}: UseListPurpose) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryFn: () =>
        listPurpose({ ...params, status, tagID }),
      queryKey: [
        dataMappingQueryKeys.purpose.all,
        { ...params, status, tagID },
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
