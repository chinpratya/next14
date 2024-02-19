// import { useQuery } from '@tanstack/react-query';
// import { z } from 'zod';

// import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
// import { apiClient } from '@/lib/api-client';
// import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

// export const listAssessmentFormCommentUnRead = async (
//   assessmentId: string
// ): Promise<string[]> => {
//   const { data } = await apiClient.get(
//     `/portal/assessment/${assessmentId}/form-unread`,
//     {
//       baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
//     }
//   );

//   return z.array(z.string()).parse(data);
// };

// export type UseListAssessmentFormCommentUnRead = {
//   assessmentId: string;
// };

// export const useListAssessmentFormCommentUnRead = ({
//   assessmentId,
// }: UseListAssessmentFormCommentUnRead) => {
//   const { data, isFetching, isFetched, isError } =
//     useQuery({
//       queryKey: [
//         compliancePortalQueryKeys.assessment.formCommentUnread(
//           assessmentId
//         ),
//       ],
//       queryFn: () =>
//         listAssessmentFormCommentUnRead(assessmentId),
//     });
//   return {
//     data,
//     isLoading: isFetching && !isFetched,
//     isError,
//   };
// };

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

// import { ResultAssessmentResponseSchema } from '../schemas/assessment';
// import { ResultResponseAssessment } from '../types/assessment';

export const listAssessmentFormCommentUnRead = async (
  assessmentId: string
): Promise<string[]> => {
  const { data } = await apiClient.get(
    `/portal/assessment/${assessmentId}/form-unread`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );

  return z.array(z.string()).parse(data);
};
type UseListAssessmentFormCommentUnReads = {
  assessmentId: string;
};
export const useListAssessmentFormCommentUnReads = ({
  assessmentId,
}: UseListAssessmentFormCommentUnReads) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.formCommentUnread(
          assessmentId
        ),
      ],
      queryFn: () =>
        listAssessmentFormCommentUnRead(assessmentId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
