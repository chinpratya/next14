import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_ONEFENCE_COMMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { shareQueryKeys } from '@/lib/queryKeys';

import { CommentSchema } from '../schemas/meta';
import { CommentType } from '../types/meta';

export type ListComment = Record<string, unknown> & {
  module: string;
  submodule: string;
  pageidorname: string;
};

export const listComment = async ({
  module,
  submodule,
  pageidorname,
  ...params
}: ListComment): Promise<CommentType[]> => {
  const response = await apiClient.get(
    `/discuss/${module}/${submodule}/${pageidorname}`,
    {
      baseURL: API_ENDPOINT_ONEFENCE_COMMENT_BASE_URL,
      params,
    }
  );
  return z.array(CommentSchema).parse(response.data);
};

export const useListComment = ({
  module,
  submodule,
  pageidorname,
  ...params
}: ListComment) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () =>
        listComment({
          module,
          submodule,
          pageidorname,
          ...params,
        }),
      queryKey: [
        shareQueryKeys.comment.all(
          module,
          submodule,
          pageidorname
        ),
        params,
      ],
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 3,
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
