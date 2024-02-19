import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { shareQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { CountryResponseSchema } from '../schemas/meta';
import { CountryResponse } from '../types/meta';

export type ListCountry = Request;

export const listCountry = async ({
  ...params
}: ListCountry = {}): Promise<CountryResponse> => {
  const response = await apiClient.get(`/meta/country`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params,
  });
  return CountryResponseSchema.parse(response);
};

export type UseListCountry = ListCountry;

export const useListCountry = ({
  ...params
}: UseListCountry = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listCountry(params),
      queryKey: [shareQueryKeys.country.all, params],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
