import { useMutation } from '@tanstack/react-query';
import { RcFile } from 'antd/lib/upload';

import { API_ENDPOINT_MANAGEME_FILE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { FileUtils } from '@/utils';

export type ImportRespApprOfInstitute = {
  organizationId: string;
  instituteId: string;
  file: FormData;
};

export const importRespApprOfInstitute = ({
  file,
  organizationId,
  instituteId,
}: ImportRespApprOfInstitute) => {
  const config = {
    baseURL: API_ENDPOINT_MANAGEME_FILE_BASE_URL,
    params: {
      org_id: organizationId,
      bid: instituteId,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return Promise.all([
    apiClient.post(
      '/proxy/imports/create_respondent',
      file,
      config
    ),
    apiClient.post(
      '/proxy/imports/create_approver',
      file,
      config
    ),
  ]);
};

export type UseImportRespApprOfInstitute = Omit<
  ImportRespApprOfInstitute,
  'file'
> & {
  onSuccess?: () => void;
};

const createFormData = async (file: RcFile) => {
  const formData = new FormData();
  const base64 = await FileUtils.convertRcFileBase64(
    file
  );

  const blob = await FileUtils.convertBase64ToBlob(
    base64
  );

  formData.append('file', blob, file.name);
  return formData;
};

export const useImportRespApprOfInstitute = ({
  onSuccess,
  organizationId,
  instituteId,
}: UseImportRespApprOfInstitute) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (file: FormData) =>
      importRespApprOfInstitute({
        file,
        organizationId,
        instituteId,
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries();
      onSuccess?.();
    },
  });

  const submit = async (file: RcFile) => {
    const formData = await createFormData(file);
    return mutate(formData);
  };

  return {
    submit,
    isLoading,
  };
};
