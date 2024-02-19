import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataLifecycleFlowSchema } from '../schemas';
import { DataLifecycleFlowType } from '../types';

export type GetCycleOfDataLifecycle = {
  dataLifecycleId: string;
};

export const getCycleOfDataLifecycle = async ({
  dataLifecycleId,
}: GetCycleOfDataLifecycle): Promise<DataLifecycleFlowType> => {
  const response = await apiClient.get(
    `/data-life-cycle/${dataLifecycleId}/cycle`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return DataLifecycleFlowSchema.parse(response.data);
};

export type UseGetCycleOfDataLifecycle = {
  dataLifecycleId: string;
};

export const useGetCycleOfDataLifecycle = ({
  dataLifecycleId,
}: UseGetCycleOfDataLifecycle) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataLifecycle.cycle(
          dataLifecycleId
        ),
      ],
      queryFn: () =>
        getCycleOfDataLifecycle({
          dataLifecycleId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
