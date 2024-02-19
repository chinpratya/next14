import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_FILE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
type presignedPublicUploadProps = {
  module: string;
  group: string;
  file_name: string;
  file_extension: string;
  expires_in: number;
};
export const presignedPublicUpload = (
  data: presignedPublicUploadProps
): Promise<void> => {
  return apiClient.post(
    `${API_ENDPOINT_FILE_MANAGEMENT_BASE_URL}/s3/upload-public`,
    data
  );
};

export type UsePresignedPublicUpload = {
  onSuccess?: () => void;
};

export const usePresignedPublicUpload = ({
  onSuccess,
}: UsePresignedPublicUpload) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: presignedPublicUploadProps) =>
      presignedPublicUpload(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
