import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { MaturityModelSchema } from '../schemas';
import { MaturityModel } from '../types';

export const getMaturityModel = async (
  maturityModelId: string
): Promise<MaturityModel> => {
  const { data } = await apiClient.get(
    `/setting/matutity-model/${maturityModelId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return MaturityModelSchema.parse(data);
};

export const useGetMaturityModel = (
  maturityModelId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.maturityModel.detail(
          maturityModelId
        ),
      ],
      queryFn: () => getMaturityModel(maturityModelId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
