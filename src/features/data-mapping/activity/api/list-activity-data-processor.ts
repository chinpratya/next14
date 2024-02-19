import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityDataProcessorResponseSchema } from '../schemas';
import { ActivityDataProcessorResponse } from '../types';

export type ListActivityDataProcessor = Request & {
  position: string;
};

export const listActivityDataProcessor = async ({
  position,
  ...params
}: ListActivityDataProcessor): Promise<ActivityDataProcessorResponse> => {
  const response = await apiClient.get(
    `/data-processor`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params: {
        ...params,
        position,
      },
    }
  );

  return ActivityDataProcessorResponseSchema.parse(
    response
  );
};

export const useListActivityDataProcessor = ({
  position,
  ...params
}: ListActivityDataProcessor) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.dataProcessor(
          position
        ),
        params,
      ],
      queryFn: () =>
        listActivityDataProcessor({
          position,
          ...params,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
