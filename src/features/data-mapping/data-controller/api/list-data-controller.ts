import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DataControllersResponseSchema } from '../schemas';
import { DataControllersResponse } from '../types';

export type ListDataController = Request & {
  position?: string;
};

export const listDataControllers = async ({
  ...params
}: ListDataController): Promise<DataControllersResponse> => {
  const response = await apiClient.get(
    `/data-processor`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return DataControllersResponseSchema.parse(response);
};

export const useListDataControllers = ({
  ...params
}: ListDataController = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataController.all,
        {
          ...params,
        },
      ],
      queryFn: () => listDataControllers({ ...params }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
