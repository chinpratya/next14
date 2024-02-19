import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { PositionResponseSchema } from '../schemas';
import { PositionResponse } from '../types';

type listJobTitleProps = Request;

export const listJobTitle = async ({
  ...params
}: listJobTitleProps): Promise<PositionResponse> => {
  const response = await apiClient.get(
    `/user/org/position`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      params,
    }
  );
  return PositionResponseSchema.parse(response);
};

export const useListJobTitle = ({
  ...params
}: listJobTitleProps) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [adminQueryKeys.jobTitle.all, params],
      queryFn: () => listJobTitle({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
