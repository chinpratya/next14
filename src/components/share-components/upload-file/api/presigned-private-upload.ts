import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_FILE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

import { uploadFilePrivate } from './upload-file-private';

type filedsType = {
  AWSAccessKeyId: string;
  'Content-Type': string;
  key: string;
  policy: string;
  signature: string;
  'x-amz-security-token': string;
};
type BobyType = {
  fields: filedsType;
  file_name: string;
  group: string;
  key: string;
  module: string;
  url: string;
  url_expires_in: number;
};
type responeType = { statusCode: number; body: BobyType };

type payloadType = {
  module: string;
  group: string;
  file_name: string;
  file_extension: string;
  expires_in: number;
};
type presignedPrivateUploadProps = {
  payload: payloadType;
  file: File;
};
export const presignedPrivateUpload = (
  data: presignedPrivateUploadProps
): Promise<responeType> => {
  return apiClient.post(
    `${API_ENDPOINT_FILE_MANAGEMENT_BASE_URL}/s3/upload`,
    data.payload
  );
};

export type UsePresignedPrivateUpload = {
  onSuccess?: () => void;
};

export const usePresignedPrivateUpload = ({
  onSuccess,
}: UsePresignedPrivateUpload) => {
  const { mutate, isLoading, isError, data } =
    useMutation({
      mutationFn: async (
        data: presignedPrivateUploadProps
      ) => {
        const dataPresigned: responeType =
          await presignedPrivateUpload(data);

        const payload = {
          ...dataPresigned.body.fields,
          file: data.file,
        };
        console.log('dataPresigned', payload);

        return uploadFilePrivate({
          payload,
          url: dataPresigned.body.url,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries();
        onSuccess?.();
      },
    });

  return {
    submit: mutate,
    isLoading,
    isError,
    data,
  };
};
