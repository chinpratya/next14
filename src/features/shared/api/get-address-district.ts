import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { districtResponseSchema } from '../schemas/address-schemas';
import { districtResponseType } from '../types/address-type';

export const getAddressDistrict = async (
  provinceID: string | undefined
): Promise<districtResponseType> => {
  const response = await apiClient.get(
    `/meta/thai-address?provinceID=${provinceID}`,
    {
      baseURL:
        'https://m58rn1ule6.execute-api.ap-southeast-1.amazonaws.com/v1',
    }
  );
  return districtResponseSchema.parse(response);
};

export const useGetAddressDistrict = (
  provinceID: string | undefined
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.address.district(provinceID),
      ],
      enabled: provinceID !== undefined,
      queryFn: () => getAddressDistrict(provinceID),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
