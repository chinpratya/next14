import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const OrganizationSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  industryGroup: z.string().nullable(),
  businessCategory: z.string().nullable(),
  agency: z.string(),
  orgGroup: z.array(z.string()),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string(),
  updatedBy: z.string(),
});

export const OrganizationInfoSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  industryGroup: z.string().nullable(),
  industryGroupID: z.string(),
  businessCategory: z.string().nullable(),
  businessCategoryID: z.string(),
  orgGroupID: z.array(z.string()).optional(),
  description: z.string().optional(),
  hcode: z.number(),
  agency: z.string(),
  hospital: z.string(),
  type: z.string(),
  currentHa: z.string(),
  district: z.string(),
  province: z.string().nullable(),
  certifiedDate: z.string(),
  organizationID: z.string().optional(),
  expireDate: z.string(),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string(),
  updatedBy: z.string(),
  organizationGroup: z.array(z.string()).optional(),
});

export const OrganizationResponseSchema = z.object({
  code: z.number(),
  message: z.string().optional(),
  data: z.array(OrganizationSchema),
  currentRecord: z.number(),
  totalRecord: z.number(),
  currentPage: z.number(),
  totalPage: z.number(),
});

export const OrganizationOptionSchema = z.object({
  ObjectUUID: z.string().optional(),
  name: z.string(),
});

export const OrganizationMetaDetailSchema = z.object({
  ObjectUUID: z.string().optional(),
  name: z.string(),
  children: z.array(OrganizationOptionSchema),
});

export const OrganizationMetaSchema = z.object({
  ObjectUUID: z.string().optional(),
  orgGroup: z
    .array(OrganizationMetaDetailSchema)
    .optional(),
  industryGroupAndBusinessCategory: z.array(
    OrganizationMetaDetailSchema
  ),
});

export const OrganizationMetaResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: OrganizationMetaSchema,
});

export const HCodeSchema = z.object({
  agency: z.string(),
  certifiedDate: z.string(),
  currentHa: z.string(),
  district: z.number(),
  hcode: z.number(),
  expireDate: z.string(),
  hospital: z.string(),
  province: z.string(),
  rank: z.number().optional(),
  remark: z.string().optional(),
  type: z.string(),
});

export const CreateOrganizationPayloadSchema =
  HCodeSchema.extend({
    name: z.string(),
    industryGroup: z.string(),
    businessCategory: z.string(),
  });

export const OrgResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export const OrganizationContactSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  department: z.string().optional(),
  position: z.string().optional(),
  tel: z.string(),
  email: z.string(),
  organizationID: z.string().optional(),
  description: z.string(),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const OrganizationContactResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationContactSchema),
  });

export const OrganizationUnitPayloadSchema = z.object({
  name: z.string(),
  province: z.union([
    z.string(),
    z.number(),
    z.unknown(),
  ]),
  district: z.union([z.string(), z.number()]),
  description: z.string(),
  organizationID: z.string(),
  branchID: z.string().optional(),
  industryGroup: z.string(),
  businessCategory: z.string(),
});

export const OrganizationPayloadSchema = z.object({
  name: z.string(),
  description: z.string(),
  industryGroup: z.string(),
  businessCategory: z.string(),
  orgGroup: z.array(z.string()).optional(),
});

export const OrganizationUnitSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  province: z.union([
    z.string(),
    z.number(),
    z.unknown(),
  ]),
  district: z.union([
    z.string(),
    z.number(),
    z.unknown(),
  ]),
  createdDt: z.string(),
  createdBy: z.string(),
  description: z.string(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const OrganizationUnitResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationInfoSchema),
  });

export const OrganizationUnitRespondentSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  organizationID: z.string(),
  organizationName: z.string(),
  branchID: z.string(),
  branchName: z.string(),
  approverName: z.string().optional(),
  approverEmail: z.string().optional(),
  department: z.string(),
  position: z.string(),
  email: z.string(),
  tel: z.string(),
  description: z.string(),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const OrganizationUnitRespondentResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationUnitRespondentSchema),
  });

export const OrganizationUnitRespondentCreateSchema =
  z.object({
    name: z.string(),
    department: z.string().optional(),
    position: z.string().optional(),
    email: z.string(),
    tel: z.string(),
    description: z.string().optional(),
  });

export const OrganizationUnitApproverSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  organization: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  email: z.string(),
  tel: z.string(),
  description: z.string().optional(),
  createdDt: z.string(),
  createdBy: z.string(),
  updatedDt: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const OrganizationUnitApproverResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationUnitApproverSchema),
  });

export const OrganizationUnitApproverRespondentSchema =
  z.object({
    key: z.string(),
    name: z.string(),
    position: z.string(),
  });

export const OrganizationUnitApproverRespondentResponseSchema =
  ResponseSchema.extend({
    data: z.array(z.string()),
  });

export const OrganizationUnitAssignmentSchema = z.object({
  ObjectUUID: z.string(),
  assessmentID: z.string(),
  assessmentName: z.string(),
  type: z.string(),
  no: z.string(),
  assignmentDt: z.string(),
  expireDt: z.string(),
  respondentCount: z.number(),
  respondentTotal: z.number(),
});

export const OrganizationUnitAssignmentResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationUnitAssignmentSchema),
  });

export const OrganizationUnitAssignmentRespondentSchema =
  z.object({
    ObjectUUID: z.string(),
    respondentName: z.string(),
    email: z.string(),
    department: z.string(),
    position: z.string(),
    status: z.string(),
    assignmentDt: z.string(),
    complateDt: z.string(),
  });

export const OrganizationUnitAssignmentRespondentResponseSchema =
  ResponseSchema.extend({
    data: z.array(
      OrganizationUnitAssignmentRespondentSchema
    ),
  });

export const GrowthGraphDetailSchema = z.object({
  orgName: z.string(),
  rank: z.string(),
  totalRank: z.string(),
  maturityModel: z.string(),
});

export const GrowthGraphSchema = z.object({
  key: z.string(),
  label: z.string(),
  data: z.array(z.string()),
  detail: z.array(GrowthGraphDetailSchema),
});

export const GrowthMetaSchema = z.object({
  key: z.string(),
  value: z.string(),
});

export const OrganizationUnitAssignmentGrowthSchema =
  z.object({
    graph: z.array(GrowthGraphSchema),
    meta: z.array(GrowthMetaSchema),
  });

export const OrganizationUnitAssignmentGrowthResponseSchema =
  ResponseSchema.extend({
    data: z.array(OrganizationUnitAssignmentGrowthSchema),
  });

export const OrganizationUnitAssignmentGrowthSectionResponseSchema =
  ResponseSchema.extend({
    data: OrganizationUnitAssignmentGrowthSchema,
  });
