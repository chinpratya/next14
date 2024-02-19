import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ConsentPurposeMetaSchema } from '../schemas';
import { ConsentPurposeMeta } from '../types';

export const getConsentManagementMetaPurpose =
  async (): Promise<ConsentPurposeMeta> => {
    const { data } = await apiClient.get(
      `/meta/purpose`,
      {
        baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
      }
    );

    return ConsentPurposeMetaSchema.parse(data);
  };

export const useGetConsentManagementMetaPurpose = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [consentManagementQueryKeys.purpose.meta],
      queryFn: () => getConsentManagementMetaPurpose(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
