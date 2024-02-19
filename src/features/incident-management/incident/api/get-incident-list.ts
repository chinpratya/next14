import { useQuery } from '@tanstack/react-query';

import { incidentManagementQueryKeys } from '@/lib/queryKeys/incident-management';
import { Request } from '@/types';

import { IncidentListResponseSchema } from '../schemas';
import {
  IncidentListProps,
  IncidentListResponse,
} from '../types';

export type GetIncidentList = Request & {
  [key: string]: unknown;
};

export const getIncidentList = async ({
  ...params
}: GetIncidentList): Promise<IncidentListResponse> => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return IncidentListResponseSchema.parse({
    data: [
      {
        ObjectID: 'PR-2311010001',
        name: 'ขอความช่วยเหลือฉุกเฉิน',
        category: 'ขอความช่วยเหลือฉุกเฉิน',
        sub_category: 'SOS',
        type: 'Emergency Response',
        tag: [
          { object_uuid: '1', name: 'Fire alarm' },
          { object_uuid: '2', name: 'สถานที่: สธค 40' },
        ],
        sla_status: 'highest',
        detail: {
          type: 'Data Subject Request',
          first_name: 'John',
          last_name: 'Doe',
        },
        estimate_time: '1 วัน 1 ชั่วโมง 30 นาที',
        status: 'open',
        task: [
          { object_uuid: '1', status: 'close' },
          { object_uuid: '2', status: 'inprogress' },
          { object_uuid: '3', status: 'open' },
        ],
        createdDt: '2023-10-31T14:27:25.000Z',
        endDt: '2023-10-31T14:27:25.000Z',
      },
    ] satisfies IncidentListProps[],
  });
};

export const useGetIncidentList = ({
  ...params
}: GetIncidentList) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.sla.all,
        params,
      ],
      queryFn: () => getIncidentList({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
