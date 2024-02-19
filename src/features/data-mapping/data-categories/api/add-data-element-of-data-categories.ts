import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type AddDataElementOfCategories = {
  dataCategoryID: string;
  dataElementID: React.Key[];
};

export const addDataElementOfCategories = async ({
  dataCategoryID,
  dataElementID,
}: AddDataElementOfCategories) =>
  await apiClient.post(
    `/data-category/${dataCategoryID}/data-element`,
    {
      dataElementID,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseCreateDataElementOfCategories = {
  onSuccess?: () => void;
  dataCategoryID: string;
};

export const useCreateDataElementOfCategories = ({
  onSuccess,
  dataCategoryID,
}: UseCreateDataElementOfCategories) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (dataElementID: React.Key[]) =>
      addDataElementOfCategories({
        dataCategoryID,
        dataElementID,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataElement.all,
      ]);
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.dataElement(
          dataCategoryID
        ),
      ]);
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataCategories.detail(
          dataCategoryID
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
