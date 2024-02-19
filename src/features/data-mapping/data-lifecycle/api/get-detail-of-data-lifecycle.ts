import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataLifecycleDataSchema } from '../schemas';
import { DataLifecycleData } from '../types';

export type getDetailOfDataLifecycle = {
  dataLifecycleId: string;
};

export const getDataOfDataLifecycle = async ({
  dataLifecycleId,
}: getDetailOfDataLifecycle): Promise<DataLifecycleData> => {
  const response = await apiClient.get(
    `/data-life-cycle/${dataLifecycleId}/cycle/data`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return DataLifecycleDataSchema.parse(response.data);
};

export const useGetDetailOfDataLifecycle = ({
  dataLifecycleId,
}: getDetailOfDataLifecycle) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataLifecycle.cycleDetail(
          dataLifecycleId
        ),
      ],
      queryFn: () =>
        getDataOfDataLifecycle({
          dataLifecycleId: dataLifecycleId,
        }),
    });

  return {
    data,
    isLoading: isFetching || !isFetched,
    isError,
  };
};
