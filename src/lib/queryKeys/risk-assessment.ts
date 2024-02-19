import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const riskAssessmentQueryKeys =
  createQueryKeyStore({
    templateRisk: {
      assessmentDetail: (assessmentId: string) => [
        assessmentId,
      ],
      all: null,
      meta: null,
      detail: (assessmentId: string) => ({
        queryKey: [assessmentId],
      }),
      chance: (assessmentId: string) => ({
        queryKey: [assessmentId],
      }),
      effect: (assessmentId: string) => ({
        queryKey: [assessmentId],
      }),
      score: (assessmentId: string) => ({
        queryKey: [assessmentId],
      }),
    },
    tags: {
      all: null,
      detail: (tagId: string) => [tagId],
    },
    measured: {
      all: null,
      detail: (measuredId: string) => [measuredId],
      form: (measuredId: string) => [measuredId],
    },
    activity: {
      all: null,
      detail: (activityId: string) => [activityId],
      assessment: (activityId: string) => [activityId],
      assessmentDetail: (assessmentId: string) => [
        assessmentId,
      ],
    },
  });
