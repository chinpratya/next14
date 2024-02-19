import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createDataCategories = async (
  data: Record<string, unknown>
): Promise<string> => {
  const response = await apiClient.post(
    `/data-category`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return z.string().parse(_.get(response, 'categoryID'));
};

export type UseCreateDataCategories = {
  onSuccess?: (categoryID: string) => void;
};

export const useCreateDataCategories = ({
  onSuccess,
}: UseCreateDataCategories = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createDataCategories,
    onSuccess: async (categoryID) => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.all,
      ]);
      onSuccess?.(categoryID);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
