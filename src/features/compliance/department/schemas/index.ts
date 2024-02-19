import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const DepartmentSchema = z.object({
  ObjectID: z.string().optional(),
  ObjectType: z.string().optional(),
  ObjectUUID: z.string(),
  TenantID: z.string().optional(),
  agency: z.string(),
  businessCategory: z.string().nullable(),
  businessCategoryID: z.string(),
  certifiedDate: z.string(),
  createdBy: z.string(),
  createdDt: z.string(),
  currentHa: z.string(),
  description: z.string().optional(),
  district: z.string(),
  districtID: z.string(),
  expireDate: z.string(),
  hcode: z.number(),
  hospital: z.string(),
  industryGroup: z.string().nullable(),
  industryGroupID: z.string(),
  isDelete: z.boolean().optional(),
  name: z.string(),
  orgGroupID: z.array(z.string()).optional(),
  organizationGroup: z.array(z.string()).optional(),
  organizationID: z.string(),
  organizationName: z.string(),
  province: z.string(),
  provinceID: z.string(),
  totalApprover: z.number(),
  totalRespondent: z.number(),
  type: z.string(),
  updatedBy: z.string(),
  updatedDt: z.string(),
});

export const DepartmentResponseSchema =
  ResponseSchema.extend({
    data: z.array(DepartmentSchema),
  });
