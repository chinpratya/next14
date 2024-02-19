import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ONEFENCE_LOCAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { shareQueryKeys } from '@/lib/queryKeys';

import { OptionTypeDataListResponseSchema } from '../schemas/option-type-data';
import { OptionTypeDataListResponse } from '../types/option-type-data';

export const listSelectOptionTypeData = async (
  type: string
): Promise<OptionTypeDataListResponse> => {
  const optionType = await apiClient.get(
    `/option/${type}`,
    {
      baseURL: API_ENDPOINT_ONEFENCE_LOCAL_BASE_URL,
    }
  );

  return OptionTypeDataListResponseSchema.parse(
    optionType
  );
};

export type UseListSelectOptionTypeDataOptions = {
  type: string;
};

export const useListSelectOptionTypeData = ({
  type,
}: UseListSelectOptionTypeDataOptions) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [shareQueryKeys.optionTypeData.all(type)],
      queryFn: () => listSelectOptionTypeData(type),
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
  };
};
