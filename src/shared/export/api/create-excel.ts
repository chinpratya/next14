import axios from 'axios';
import file from 'file-saver';

import { API_ENDPOINT_ONEFENCE_BASE_URL } from '@/config/endpoint';

export const createExcel = async (
  data:
    | Record<string, unknown>
    | Record<string, unknown>[],
  fileName?: string
) => {
  const response = await axios.post(
    `/mapapi/createexcel`,
    {
      data,
    },
    {
      headers: { 'Content-Type': 'application/json' },
      baseURL: API_ENDPOINT_ONEFENCE_BASE_URL,
      responseType: 'blob',
    }
  );

  const blob = new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  file.saveAs(
    blob,
    fileName?.concat('xlsx') ?? 'export.xlsx'
  );
};
