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
  await apiClient.delete(
    `${url}/${module}/${group}/${filename}`,
    {
      headers: {
        Authorization: null,
      },
      baseURL: API_ENDPOINT_FILE_MANAGEMENT_BASE_URL,
    }
  );
  return filename;
};

export type UseDeleteFileOptions = {
  module: string;
  group: string;
  env: 'private' | 'public';
  onSuccess?: (fileName: string) => void;
};

export const useDeleteFile = ({
  module,
  group,
  env,
  onSuccess,
}: UseDeleteFileOptions) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (filename: string) =>
      deleteFile(module, group, env, filename),
    onSuccess: async (fileName: string) => {
      await queryClient.resetQueries([
        fileManagementQueryKeys.file.list(
          module,
          group,
          env
        ),
      ]);
      onSuccess?.(fileName);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
