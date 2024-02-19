import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type CreateDataLifecycle = {
  activityId: string;
};

export const createDataLifecycle = async ({
  activityId,
}: CreateDataLifecycle): Promise<string> => {
  const response = await apiClient.post(
    `/data-life-cycle`,
    {
      activityID: activityId,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return z
    .string()
    .parse(_.get(response, 'ObjectUUID', undefined));
};

export type UseCreateDataLifecycle = {
  onSuccess?: (dataLifecycleId: string) => void;
};

export const useCreateDataLifecycle = ({
  onSuccess,
}: UseCreateDataLifecycle = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (activityId: string) =>
      createDataLifecycle({
        activityId,
      }),
    onSuccess: async (dataLifecycleId) => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataLifecycle.all,
      ]);
      onSuccess?.(dataLifecycleId);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
