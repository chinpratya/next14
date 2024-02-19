import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createActivity = async (
  body: Record<string, unknown>
): Promise<string> => {
  const response = await apiClient.post(
    `/activity`,
    body,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return z.string().parse(_.get(response, 'ObjectUUID'));
};

export type UseCreateActivity = {
  onSuccess?: (activityId: string) => void;
};

export const useCreateActivity = ({
  onSuccess,
}: UseCreateActivity = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createActivity,
    onSuccess: async (activityId: string) => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.all,
      ]);
      onSuccess?.(activityId);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
