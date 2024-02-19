import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataControllerSchema } from '../schemas';
import { DataController } from '../types';

export const getDataController = async (
  dataControllerId: string
): Promise<DataController> => {
  const response = await apiClient.get(
    `/data-processor/${dataControllerId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return DataControllerSchema.parse(response.data);
};

export const useGetDataController = (
  dataControllerId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getDataController(dataControllerId),
      queryKey: [
        dataMappingQueryKeys.dataController.detail(
          dataControllerId
        ),
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
