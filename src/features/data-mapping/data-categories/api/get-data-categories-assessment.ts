import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataCategoriesAssessmentsDetailSchema } from '../schemas';
import { DataCategoriesAssessmentsDetail } from '../types';

type GetDataCategoriesAssessment = {
  dataCategoriesId: string;
  assessmentId: string;
};
export const getDataCategoriesAssessment = async ({
  dataCategoriesId,
  assessmentId,
}: GetDataCategoriesAssessment): Promise<DataCategoriesAssessmentsDetail> => {
  const response = await apiClient.get(
    `/data-category/${dataCategoriesId}/assessment/${assessmentId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return DataCategoriesAssessmentsDetailSchema.parse(
    response.data
  );
};

type UseGetDataCategoriesAssessment = {
  dataCategoriesId: string;
  assessmentId: string;
};
export const useGetDataCategoriesAssessment = ({
  dataCategoriesId,
  assessmentId,
}: UseGetDataCategoriesAssessment) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataCategories.assessmentDetail(
          dataCategoriesId,
          assessmentId
        ),
      ],
      queryFn: () =>
        getDataCategoriesAssessment({
          dataCategoriesId,
          assessmentId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
