import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataMappingOrganizationsSchema } from '../schemas';
import { DataMappingOrganizations } from '../types';

export const getDataMappingOrganizations = async (
  organizationsId?: string
): Promise<DataMappingOrganizations> => {
  const response = await apiClient.get(
    `/entity/${organizationsId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return DataMappingOrganizationsSchema.parse(
    response.data
  );
};

export const useGetDataMappingOrganizations = (
  organizationsId?: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () =>
        getDataMappingOrganizations(organizationsId),
      queryKey: [
        dataMappingQueryKeys.organization.detail(
          organizationsId
        ),
      ],
      enabled: !!organizationsId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
