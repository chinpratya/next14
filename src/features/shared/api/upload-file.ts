import { useMutation } from '@tanstack/react-query';
import type { RcFile } from 'antd/es/upload';
import _ from 'lodash';

import { API_ENDPOINT_FILE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { fileManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { FileUtils } from '@/utils';

import { PresignedUploadSchema } from '../schemas/file-management';
import { PresignedUpload } from '../types/file-management';

const presignedUploadFile = async (
  module: string,
  group: string,
  file_name: string,
  file_extension: string,
  mode: 'public' | 'private'
): Promise<PresignedUpload> => {
  const url =
    mode === 'public'
      ? '/s3/upload-public'
      : '/s3/upload-private';
  const response = await apiClient.post(
    url,
    {
      module,
      group,
      file_name,
      file_extension,
    },
    {
      baseURL: API_ENDPOINT_FILE_MANAGEMENT_BASE_URL,
      headers: {
        Authorization: null,
      },
    }
  );
  return PresignedUploadSchema.parse(
    _.get(response, 'body', {})
  );
};

export const uploadFile = (
  url: string,
  formData: FormData
) =>
  apiClient.post(url, formData, {
    baseURL: API_ENDPOINT_FILE_MANAGEMENT_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: null,
    },
  });

export type UseUploadFile = {
  module: string;
  group: string;
  mode?: 'public' | 'private';
  onSuccess?: (presigned: PresignedUpload) => void;
  onError?: () => void;
};

export const useUploadFile = ({
  module,
  group,
  mode = 'public',
  onSuccess,
  onError,
}: UseUploadFile) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: async (file: RcFile) => {
      const fileExtension = file?.type
        ?.split('/')
        .reverse()[0];
      const presignedUpload = await presignedUploadFile(
        module,
        group,
        file.name,
        fileExtension,
        mode
      );

      const formData = new FormData();
      Object.entries(presignedUpload.fields).forEach(
        ([key, value]) => {
          formData.append(key, value);
        }
      );

      const base64 = await FileUtils.convertRcFileBase64(
        file
      );
      const blob = await FileUtils.convertBase64ToBlob(
        base64
      );

      formData.append('file', blob, file.name);

      await uploadFile(presignedUpload.url, formData);

      return presignedUpload;
    },
    onSuccess: async (presigned: PresignedUpload) => {
      await queryClient.invalidateQueries([
        fileManagementQueryKeys.file.list(
          module,
          group,
          mode
        ),
      ]);
      onSuccess?.(presigned);
    },
    onError: () => {
      onError?.();
    },
  });
  return {
    submit: mutate,
    isLoading,
  };
};
