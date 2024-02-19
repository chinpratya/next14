import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createPurpose = async (
  data: Record<string, unknown>
): Promise<string> => {
  const response = await apiClient.post(
    `/purpose`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return z.string().parse(_.get(response, 'purposeID'));
};

export type UseCreatePurpose = {
  onSuccess?: (purposeId?: string) => void;
};

export const useCreatePurpose = ({
  onSuccess,
}: UseCreatePurpose) => {
  const { mutate, isLoading, data, isError } =
    useMutation({
      mutationFn: createPurpose,
      onSuccess: async (purposeId: string) => {
        await queryClient.invalidateQueries([
          dataMappingQueryKeys.purpose.all,
        ]);
        onSuccess?.(purposeId);
      },
    });

  return {
    submit: mutate,
    isLoading,
    data,
    isError,
  };
};
