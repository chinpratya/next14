import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DataMappingOrganizationResponseSchema } from '../schemas';
import { DataMappingOrganizationResponse } from '../types';

export type ListDataMappingOrganizations = Request;

export const listDataMappingOrganizations = async (
  params: ListDataMappingOrganizations
): Promise<DataMappingOrganizationResponse> => {
  const response = await apiClient.get(`/entity`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params,
  });
  return DataMappingOrganizationResponseSchema.parse(
    response
  );
};

export type useListDataMappingOrganizations =
  ListDataMappingOrganizations;

export const useListDataMappingOrganizations = (
  params: useListDataMappingOrganizations
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listDataMappingOrganizations(params),
      queryKey: [
        dataMappingQueryKeys.organization.all,
        params,
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
