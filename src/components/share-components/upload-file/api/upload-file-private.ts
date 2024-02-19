import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
type payloadType = {
  AWSAccessKeyId: string;
  'Content-Type': string;
  key: string;
  policy: string;
  signature: string;
  'x-amz-security-token': string;
  file: File;
};

type uploadFilePrivateProps = {
  payload: payloadType;
  url: string;
};
export const uploadFilePrivate = (
  data: uploadFilePrivateProps
): Promise<void> => {
  const formdata = new FormData();
  //   const reader = new FileReader();
  //   reader.readAsDataURL(data.payload.file);
  //   reader.onload = function () {
  //     const blob = new Blob([reader.result as string], {
  //       type: data.payload.file.type,
  //     });

  //   };
  formdata.append('file', data.payload.file);

  formdata.append(
    'AWSAccessKeyId',
    data.payload.AWSAccessKeyId
  );
  formdata.append(
    'Content-Type',
    data.payload['Content-Type']
  );
  formdata.append('key', data.payload.key);
  formdata.append('policy', data.payload.policy);
  formdata.append('signature', data.payload.signature);
  formdata.append(
    `"x-amz-security-token"`,
    data.payload['x-amz-security-token']
  );

  return apiClient.post(
    `${data.url}/s3/upload`,
    formdata
  );
};

export type UseUploadFilePrivate = {
  onSuccess?: () => void;
};

export const useUploadFilePrivate = ({
  onSuccess,
}: UseUploadFilePrivate) => {
  const { mutate, isLoading, isError, data } =
    useMutation({
      mutationFn: (data: uploadFilePrivateProps) =>
        uploadFilePrivate(data),
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
