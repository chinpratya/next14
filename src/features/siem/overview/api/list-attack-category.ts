import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys/core';

import {
  Option,
  ReportPayload,
} from '../../report/types';

type ListAlertSignatureRule = {
  payload?: ReportPayload;
};

export const listAttackCategory = async ({
  payload,
}: ListAlertSignatureRule): Promise<Option[]> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return data;
};

type UseListAlertSignatureRule = ListAlertSignatureRule;

export const useListAlertSignatureRule = ({
  payload,
}: UseListAlertSignatureRule) => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryFn: () => listAttackCategory({ payload }),
    queryKey: [
      coreQueryKeys.reportChartsDashboard.all,
      payload,
    ],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
