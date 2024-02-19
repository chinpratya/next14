import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const complianceQueryKeys = createQueryKeyStore({
  icon: {
    all: null,
  },
  dashboard: {
    all: (
      organizationID: string[],
      branchID: string[],
      assessmentID: string,
      assessmentSubmissionID: string[]
    ) => [
      organizationID,
      branchID,
      assessmentID,
      assessmentSubmissionID,
    ],
    meta: null,
  },
  address: {
    province: null,
    district: (provinceId?: string) => ({
      queryKey: [provinceId ?? -1],
    }),
    tambon: (provinceId: string, districtId: string) => ({
      queryKey: [provinceId, districtId],
    }),
    zipcode: (
      provinceId: string,
      districtId: string,
      tambon: string
    ) => ({
      queryKey: [provinceId, districtId, tambon],
    }),
  },
  assessment: { all: null },
  assessmentSubmission: {
    all: null,
    detail: (assessmentId: string) => ({
      queryKey: [assessmentId],
    }),
    respondent: (assessmentId: string) => ({
      queryKey: [assessmentId],
    }),
    branchRespondent: (assessmentId: string) => ({
      queryKey: [assessmentId],
    }),
    detailRespondent: (
      assessmentId: string,
      respondentId: string
    ) => ({
      queryKey: [assessmentId, respondentId],
    }),
    detailRespondentForm: (
      assessmentId: string,
      respondentId: string
    ) => ({
      queryKey: [assessmentId, respondentId],
    }),
    detailRespondentListComment: (
      assessmentId: string,
      formId: string
    ) => ({
      queryKey: [assessmentId, formId],
    }),
    detailRespondentFormComment: (
      assessmentId: string
    ) => ({
      queryKey: [assessmentId],
    }),
    respondentLog: (
      assessmentId: string,
      respondentId: string
    ) => ({
      queryKey: [assessmentId, respondentId, 'log'],
    }),
    setting: (assessmentId: string) => ({
      queryKey: [assessmentId],
    }),
    ranking: (
      assessmentId: string,
      type: string,
      search: string
    ) => [assessmentId, type, search],
    report: (
      assessmentId: string,
      organizationId: string,
      branchId: string
    ) => [assessmentId, organizationId, branchId],
    orgRespondent: (assessmentId: string) => [
      assessmentId,
    ],
    export: (assessmentId: string) => ({
      queryKey: [assessmentId],
    }),
  },
  assessmentInventory: {
    all: (page: number, pageSize: number) => [
      page,
      pageSize,
    ],
    detail: (assessmentId: string) => ({
      queryKey: [assessmentId],
    }),
    form: (assessmentId: string) => ({
      queryKey: [assessmentId],
    }),
    score: (assessmentId: string) => ({
      queryKey: [assessmentId],
    }),
    logic: (assessmentId: string) => ({
      queryKey: [assessmentId],
    }),
  },
  maturityModel: {
    all: (
      search: string,
      page: number,
      pageSize: number
    ) => [search, page, pageSize],
    detail: (maturityModelId: string) => ({
      queryKey: [maturityModelId],
    }),
  },
  organization: {
    all: null,
    detail: (organizationId: string) => ({
      queryKey: [organizationId],
    }),
    contact: (organizationId: string) => [organizationId],
    branchContact: (
      organizationId: string,
      branchId: string
    ) => [organizationId, branchId],
    detailContact: (
      organizationId: string,
      contactId: string
    ) => ({
      queryKey: [organizationId, 'contact', contactId],
    }),
    branchDetailContact: (
      organizationId: string,
      contactId: string,
      branchId: string
    ) => ({
      queryKey: [
        organizationId,
        'contact',
        contactId,
        branchId,
      ],
    }),
    unit: (organizationId: string) => [organizationId],
    detailUnit: (
      organizationId: string,
      instituteId: string
    ) => ({
      queryKey: [organizationId, 'unit', instituteId],
    }),
    respondent: (
      organizationId: string,
      instituteId: string,
      page: number,
      pageSize: number
    ) => [organizationId, instituteId, page, pageSize],
    detailRespondent: (
      organizationId: string,
      instituteId: string,
      respondentId: string
    ) => ({
      queryKey: [
        organizationId,
        'unit',
        instituteId,
        'respondent',
        respondentId,
      ],
    }),
    approver: (
      organizationId: string,
      instituteId: string
    ) => [organizationId, instituteId],
    detailApprover: (
      organizationId: string,
      instituteId: string,
      approverId: string
    ) => ({
      queryKey: [
        organizationId,
        'unit',
        instituteId,
        'approver',
        approverId,
      ],
    }),
    approverRespondent: (
      organizationId: string,
      instituteId: string,
      approverId: string
    ) => ({
      queryKey: [
        organizationId,
        'unit',
        instituteId,
        'approver',
        approverId,
      ],
    }),
    assignment: (
      organizationId: string,
      instituteId: string,
      page: number,
      pageSize: number
    ) => [organizationId, instituteId, page, pageSize],
    detailAssignment: (
      organizationId: string,
      instituteId: string,
      assignmentId: string
    ) => ({
      queryKey: [
        organizationId,
        'unit',
        instituteId,
        'assignment',
        assignmentId,
      ],
    }),
    assignmentRespondent: (
      organizationId: string,
      instituteId: string,
      assignmentId: string,
      page: number,
      pageSize: number
    ) => [
      organizationId,
      instituteId,
      assignmentId,
      page,
      pageSize,
    ],
    assignmentGrowthOverview: (
      organizationId: string,
      instituteId: string,
      assignmentId: string
    ) => [organizationId, instituteId, assignmentId],
    assignmentGrowthSection: (
      organizationId: string,
      instituteId: string,
      assignmentId: string
    ) => [organizationId, instituteId, assignmentId],
  },
  metaOrg: {
    all: null,
    detail: (orgId: string) => ({
      queryKey: [orgId],
    }),
  },
});
