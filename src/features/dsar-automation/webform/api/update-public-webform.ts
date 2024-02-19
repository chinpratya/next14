import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { ConsentFormType } from '@/types';

import { updateWebformTemplate } from './update-webform-template';

export type UpdatePublicWebform = {
  webformId: string;
  data: Record<string, unknown>;
  isPublic?: boolean;
};

export const updatePublicWebform = async ({
  webformId,
  data,
  isPublic = false,
}: UpdatePublicWebform): Promise<void> => {
  return apiClient.put(
    `/webfrom/${webformId}`,
    {
      ...data,
      isPublic,
    },
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );
};

export type UseUpdatePublicWebform = {
  webformId: string;
  onSuccess?: (isPublic: boolean) => void;
};

export const useUpdatePublicWebform = ({
  webformId,
  onSuccess,
}: UseUpdatePublicWebform) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      data,
      isPublic,
      form,
      formLanguage,
    }: {
      data: Record<string, unknown>;
      isPublic: boolean;
      formLanguage?: string;
      form?: ConsentFormType;
    }): Promise<boolean> => {
      if (form) {
        await updateWebformTemplate({
          webformId,
          form,
          language: formLanguage,
        });
      }
      await updatePublicWebform({
        webformId,
        data,
        isPublic,
      });

      return isPublic;
    },
    onSuccess: async (isPublic: boolean) => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.webform.template(
          webformId
        ),
      ]);
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.webform.detail(webformId),
      ]);
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.webform.all,
      ]);
      onSuccess?.(isPublic);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
