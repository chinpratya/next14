import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataLifecycleSchema } from '../schemas';
import { DataLifecycle } from '../types';

export type GetDataLifecycle = {
  dataLifecycleId: string;
};

export const getDataLifecycle = async ({
  dataLifecycleId,
}: GetDataLifecycle): Promise<DataLifecycle> => {
  const response = await apiClient.get(
    `/data-life-cycle/${dataLifecycleId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return DataLifecycleSchema.parse(response.data);
};

export type UseGetDataLifecycle = {
  dataLifecycleId: string;
};

export const useGetDataLifecycle = ({
  dataLifecycleId,
}: UseGetDataLifecycle) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataLifecycle.detail(
          dataLifecycleId
        ),
      ],
      queryFn: () =>
        getDataLifecycle({ dataLifecycleId }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
