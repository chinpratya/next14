import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';

import { LogFileSchema } from '../schemas';
import { LogFile } from '../types';

export const getLogFile = async (
  fileId: string
): Promise<LogFile> => {
  const { data } = await apiClient.get(
    `/log/directory/${fileId}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return LogFileSchema.parse(data);
};

type UseGetLogFile = {
  fileId: string;
  enabled?: boolean;
};

export const useGetLogFile = ({
  fileId,
  enabled = true,
}: UseGetLogFile) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getLogFile(fileId),
      queryKey: [logQueryKeys.directory.detail(fileId)],
      enabled: enabled,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
