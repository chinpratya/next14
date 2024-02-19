import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type LawfulBasis = {
  basisId: string[];
  rightsOfDataSubjectId: string[];
};

export type UpdateActivityLawfulBasis = {
  activityId: string;
  lawfulBasis: LawfulBasis;
};

export const updateActivityLawfulBasis = ({
  activityId,
  lawfulBasis,
}: UpdateActivityLawfulBasis): Promise<void> =>
  apiClient.put(
    `/activity/${activityId}/lawful-basis`,
    {
      basisID: lawfulBasis.basisId,
      rightsOfDataSubjectID:
        lawfulBasis.rightsOfDataSubjectId,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateActivityLawfulBasis = {
  activityId: string;
  onSuccess?: () => void;
};

export const useUpdateActivityLawfulBasis = ({
  activityId,
  onSuccess,
}: UseUpdateActivityLawfulBasis) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (lawfulBasis: LawfulBasis) =>
      updateActivityLawfulBasis({
        activityId,
        lawfulBasis,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.lawfulBasis(
          activityId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
