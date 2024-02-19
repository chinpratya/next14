import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_RISK_ASSESSMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';

import { TagSchema } from '../schemas';
import { Tag } from '../types';

export const getTag = async (
  tagId: string
): Promise<Tag> => {
  const response = await apiClient.get(`/tag/${tagId}`, {
    baseURL: API_ENDPOINT_RISK_ASSESSMENT_BASE_URL,
  });

  return TagSchema.parse(response.data);
};

export const useGetTag = (tagId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        riskAssessmentQueryKeys.tags.detail(tagId),
      ],
      queryFn: () => getTag(tagId),
      enabled: !!tagId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
