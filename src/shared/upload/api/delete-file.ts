import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_FILE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { fileManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteFile = async (
  module: string,
  group: string,
  env: 'private' | 'public',
  filename: string
) => {
  const url =
    env === 'private' ? `/s3/file` : `/s3/file-public`;

  return apiClient.delete(
    `${url}/${module}/${group}/${filename}`,
    {
      headers: {
        Authorization: null,
      },
      baseURL: API_ENDPOINT_FILE_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseDeleteFileOptions = {
  module: string;
  group: string;
  mode: 'private' | 'public';
  onSuccess?: () => void;
};

export const useDeleteFile = ({
  module,
  group,
  mode,
  onSuccess,
}: UseDeleteFileOptions) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (filename: string) =>
      deleteFile(module, group, mode, filename),
    onSuccess: () => {
      queryClient.invalidateQueries([
        fileManagementQueryKeys.file.list(
          module,
          group,
          mode
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
