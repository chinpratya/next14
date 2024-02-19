import { useMutation } from '@tanstack/react-query';
import { RcFile } from 'antd/lib/upload';

import { API_ENDPOINT_MANAGEME_FILE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { OrgResponseSchema } from '../schemas';
import { createOrganizationResponse } from '../types';

export const importOrganization = async (
  data: FormData
): Promise<void> => {
  await apiClient.post(
    `/proxy/imports/compliance_org`,
    data,
    {
      baseURL: API_ENDPOINT_MANAGEME_FILE_BASE_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  //   return OrgResponseSchema.parse(response);
};

export type UseImportOrganization = {
  onSuccess?: () => void;
};

export const useImportOrganization = ({
  onSuccess,
}: UseImportOrganization) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: importOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.organization.all,
      ]);

      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
