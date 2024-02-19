import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { SettingSchema } from '../schemas';
import { Setting } from '../types';

export const getSetting = async (): Promise<Setting> => {
  const response = await apiClient.get(`/log/setting`, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
  return SettingSchema.parse(response.data);
};

type UseGetSetting = {
  enabled?: boolean;
};

export const useGetSetting = ({
  enabled = true,
}: UseGetSetting) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [logQueryKeys.setting.detail],
      queryFn: () => getSetting(),
      enabled,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
