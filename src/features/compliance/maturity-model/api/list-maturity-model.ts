import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { ListMaturityModelSchema } from '../schemas';
import { ListMaturityModel } from '../types';

export const listMaturityModel = async (
  search: string,
  page: number,
  pageSize: number
): Promise<ListMaturityModel> => {
  const response = await apiClient.get(
    `/setting/matutity-model`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      params: {
        search,
        page,
        pageSize,
      },
    }
  );
  return ListMaturityModelSchema.parse(response);
};

export type UseListMaturityModel = {
  search?: string;
  page: number;
  pageSize: number;
};

export const useListMaturityModel = ({
  search = '',
  page,
  pageSize,
}: UseListMaturityModel) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.maturityModel.all(
          search,
          page,
          pageSize
        ),
      ],
      queryFn: () =>
        listMaturityModel(search, page, pageSize),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
