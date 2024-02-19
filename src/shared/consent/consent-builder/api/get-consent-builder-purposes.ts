import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { ConsentPurposeSchema } from '@/schema';
import { ConsentPurposeType } from '@/types';

export type GetConsentBuilderPurposes = {
  collectionPointId: string;
};

export const getConsentBuilderPurposes = async ({
  collectionPointId,
}: GetConsentBuilderPurposes): Promise<
  ConsentPurposeType[]
> => {
  const response = await apiClient.get(
    `/collectionpoint/purpose/${collectionPointId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return z
    .array(ConsentPurposeSchema)
    .parse(response.data);
};

export const useGetConsentBuilderPurposes = ({
  collectionPointId,
}: GetConsentBuilderPurposes) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      enabled: !!collectionPointId,
      queryKey: [
        consentManagementQueryKeys.collectionPoint.purpose(
          collectionPointId
        ),
      ],
      queryFn: () =>
        getConsentBuilderPurposes({
          collectionPointId,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
