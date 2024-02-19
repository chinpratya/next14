import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

import { RopaExportSchema } from '../schemas';
import { RopaExport } from '../types';
export const getRopaExport = async (
  ropaId: string
): Promise<RopaExport> => {
  const { data } = await apiClient.get(
    `/ropa/${ropaId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params: {
        export: true,
      },
    }
  );
  return RopaExportSchema.parse(data);
};
