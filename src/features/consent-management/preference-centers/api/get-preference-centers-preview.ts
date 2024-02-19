import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import {
  ConsentBuilderFormType,
  ConsentBuilderFormSchema,
} from '@/stores/consent-builder';

export type GetPreferenceCentersPreview = {
  preferenceCenterId: string;
};

export const getPreferenceCentersPreview = async ({
  preferenceCenterId,
}: GetPreferenceCentersPreview): Promise<ConsentBuilderFormType> => {
  const response = await apiClient.get(
    `/preference/preview/${preferenceCenterId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ConsentBuilderFormSchema.parse(
    response.data?.form
  );
};

export const useGetPreferenceCentersPreview = ({
  preferenceCenterId,
}: GetPreferenceCentersPreview) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.preferenceCenters.preview(
          preferenceCenterId
        ),
      ],
      queryFn: () =>
        getPreferenceCentersPreview({
          preferenceCenterId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
