import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ConsentCollectionPointPrivacyNoticeSchema } from '../schemas';
import { ConsentCollectionPointPrivacyNotice } from '../types';

export const getCollectionPointPrivacyNotice = async (
  collectionPointId: string
): Promise<ConsentCollectionPointPrivacyNotice> => {
  const response = await apiClient.get(
    `/collectionpoint/privacynotice/${collectionPointId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ConsentCollectionPointPrivacyNoticeSchema.parse(
    response.data
  );
};

export const useGetCollectionPointPrivacyNotice = (
  collectionPointId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.setting(
          collectionPointId
        ),
      ],
      queryFn: () =>
        getCollectionPointPrivacyNotice(
          collectionPointId
        ),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
