import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';

export const readLogFile = async (
  fileId: string
): Promise<string> => {
  const { data } = await apiClient.get(
    `/log/directory/read/${fileId}?limit=100`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return data;
};

type UseReadLogFile = {
  fileId: string;
  enabled?: boolean;
};

export const useReadLogFile = ({
  fileId,
  enabled = true,
}: UseReadLogFile) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => readLogFile(fileId),
      queryKey: [logQueryKeys.directory.read(fileId)],
      enabled: !!fileId && enabled,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
