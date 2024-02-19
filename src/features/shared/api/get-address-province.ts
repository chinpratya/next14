import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { provinceResponseSchema } from '../schemas/address-schemas';
import { provinceResponseType } from '../types/address-type';

export const getAddressProvince =
  async (): Promise<provinceResponseType> => {
    const response = await apiClient.get(
      `/meta/thai-address`,
      {
        baseURL:
          'https://m58rn1ule6.execute-api.ap-southeast-1.amazonaws.com/v1',
      }
    );
    return provinceResponseSchema.parse(response);
  };

export const useGetAddressProvince = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [complianceQueryKeys.address.province],
      queryFn: () => getAddressProvince(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
