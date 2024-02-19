import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ConsentCollectionPointPolicyMetaSchema } from '../schemas';
import { ConsentCollectionPointPolicyMeta } from '../types';

export const listCollectionPointPolicy =
  async (): Promise<
    ConsentCollectionPointPolicyMeta[]
  > => {
    const response = await apiClient.get(
      `/policyNotices`,
      {
        baseURL:
          API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
      }
    );

    return z
      .array(ConsentCollectionPointPolicyMetaSchema)
      .parse(
        _.get(response, 'Items', []).map(
          (item: Record<string, unknown>) => ({
            ObjectUUID: item?.ObjectUUID,
            policyName: item?.name,
            status: item?.status,
          })
        )
      );
  };

export const useListCollectionPointPolicy = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.policy,
      ],
      queryFn: listCollectionPointPolicy,
    });

  return {
    data: _.filter(data, {
      status: 'Publish',
    }),
    isLoading: isFetching && !isFetched,
    isError,
  };
};
