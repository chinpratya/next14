import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { SettingResultchema } from '../schemas/assessment';
import { SettingResult } from '../types/assessment';

export type GetSetting = {
  assessmentId: string;
};
export const getSetting = async ({
  assessmentId,
}: GetSetting): Promise<SettingResult> => {
  const { data } = await apiClient.get(
    `/portal/assessment/${assessmentId}/setting`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );
  return SettingResultchema.parse(data);
};

export type UseGetSetting = GetSetting;

export const useGetSetting = ({
  assessmentId,
}: UseGetSetting) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.setting(
          assessmentId
        ),
      ],
      queryFn: () =>
        getSetting({
          assessmentId,
        }),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
