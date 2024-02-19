import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdatePreferenceCentersPreview = {
  preferenceCenterId: string;
  isPublish: boolean;
  form: Record<string, unknown>;
};

export const updatePreferenceCentersPreview = async ({
  preferenceCenterId,
  isPublish,
  form,
}: UpdatePreferenceCentersPreview) =>
  apiClient.put(
    `/preference/preview/${preferenceCenterId}`,
    {
      isPublish,
      form,
    },
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseUpdatePreferenceCentersPreview = Pick<
  UpdatePreferenceCentersPreview,
  'preferenceCenterId'
>;

export const useUpdatePreferenceCentersPreview = ({
  preferenceCenterId,
}: UseUpdatePreferenceCentersPreview) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (
      data: Omit<
        UpdatePreferenceCentersPreview,
        'preferenceCenterId'
      >
    ) =>
      updatePreferenceCentersPreview({
        preferenceCenterId,
        ...data,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.preferenceCenters.preview(
          preferenceCenterId
        ),
      ]);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
