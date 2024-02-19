import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { cookieManagementQueryKeys } from '@/lib/queryKeys';

import { bannerSettingSchema } from '../schemas';
import { BannerSettingType } from '../types';

export const getBanner = async (
  domainKey: string
): Promise<BannerSettingType> => {
  const { data } = await apiClient.get(
    `/domain/${domainKey}`,
    {
      baseURL: API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL,
    }
  );

  return bannerSettingSchema.parse(data?.setting);
};

export const useGetBanner = (domainKey: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        cookieManagementQueryKeys.banner.detail(
          domainKey
        ),
      ],
      queryFn: () => getBanner(domainKey),
      enabled: !!domainKey,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
