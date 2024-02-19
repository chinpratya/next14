import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useState } from 'react';
import { z } from 'zod';

import { API_ENDPOINT_FILE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { fileManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { FileSchema } from '../schemas/file-management';
import { File } from '../types/file-management';

export const listFile = async (
  module: string,
  group: string,
  env: 'private' | 'public'
): Promise<File[]> => {
  const url =
    env === 'private' ? `/s3/list` : `/s3/list-public`;
  const response = await apiClient.get(url, {
    baseURL: API_ENDPOINT_FILE_MANAGEMENT_BASE_URL,
    headers: {
      Authorization: null,
    },
    params: {
      module,
      group,
    },
  });

  return z
    .array(FileSchema)
    .parse(_.get(response, 'body.list_file', []));
};

export type UseListFileOptions = {
  module: string;
  group: string;
  env?: 'private' | 'public';
};

export const useListFile = ({
  module,
  group,
  env = 'public',
}: UseListFileOptions) => {
  const [isRefreshing, setIsRefresh] = useState(false);

  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        fileManagementQueryKeys.file.list(
          module,
          group,
          env
        ),
      ],
      queryFn: () => listFile(module, group, env),
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
    refresh: async () => {
      setIsRefresh(true);
      await queryClient.invalidateQueries([
        fileManagementQueryKeys.file.list(
          module,
          group,
          env
        ),
      ]);
      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
      setIsRefresh(false);
    },
    isRefreshing,
  };
};
