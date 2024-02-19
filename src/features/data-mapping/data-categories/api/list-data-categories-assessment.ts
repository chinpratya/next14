import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DataCategoriesAssessmentResponseSchema } from '../schemas';
import { DataCategoriesAssessmentResponse } from '../types';

type ListDataCategoriesAssessment = Request & {
  dataCategoryID: string;
};

export const listDataCategoriesAssessment = async ({
  dataCategoryID,
  ...params
}: ListDataCategoriesAssessment): Promise<DataCategoriesAssessmentResponse> => {
  const response = await apiClient.get(
    `/data-category/${dataCategoryID}/assessment`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );
  return DataCategoriesAssessmentResponseSchema.parse(
    response
  );
};

export const useListDataCategoriesAssessment = ({
  dataCategoryID,
  ...params
}: ListDataCategoriesAssessment) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataCategories.assessment(
          dataCategoryID
        ),
        {
          ...params,
        },
      ],
      queryFn: () =>
        listDataCategoriesAssessment({
          dataCategoryID,
          ...params,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
