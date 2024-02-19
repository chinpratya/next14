import { z } from 'zod';

import {
  OrganizationSchema,
  OrganizationResponseSchema,
  OrganizationMetaSchema,
  OrganizationMetaResponseSchema,
  CreateOrganizationPayloadSchema,
  OrgResponseSchema,
  OrganizationContactSchema,
  OrganizationContactResponseSchema,
  OrganizationUnitResponseSchema,
  OrganizationUnitRespondentSchema,
  OrganizationUnitRespondentResponseSchema,
  OrganizationUnitRespondentCreateSchema,
  OrganizationUnitApproverSchema,
  OrganizationUnitApproverResponseSchema,
  OrganizationUnitApproverRespondentSchema,
  OrganizationUnitApproverRespondentResponseSchema,
  OrganizationUnitAssignmentSchema,
  OrganizationUnitAssignmentResponseSchema,
  OrganizationUnitAssignmentRespondentSchema,
  OrganizationUnitAssignmentRespondentResponseSchema,
  OrganizationUnitAssignmentGrowthSchema,
  OrganizationUnitAssignmentGrowthResponseSchema,
  OrganizationUnitAssignmentGrowthSectionResponseSchema,
  OrganizationUnitPayloadSchema,
  OrganizationPayloadSchema,
  HCodeSchema,
  OrganizationInfoSchema,
} from '../schemas';

export type Organization = z.infer<
  typeof OrganizationSchema
>;

export type OrganizationInfo = z.infer<
  typeof OrganizationInfoSchema
>;

export type organizationResponse = z.infer<
  typeof OrganizationResponseSchema
>;

export type organizationMeta = z.infer<
  typeof OrganizationMetaSchema
>;

export type organizationMetaResponse = z.infer<
  typeof OrganizationMetaResponseSchema
>;

export type createOrganizationPayload = z.infer<
  typeof CreateOrganizationPayloadSchema
>;

export type createOrganizationResponse = z.infer<
  typeof OrgResponseSchema
>;

export type deleteOrganizationResponse = z.infer<
  typeof OrgResponseSchema
>;

export type OrganizationContact = z.infer<
  typeof OrganizationContactSchema
>;

export type OrganizationContactResponse = z.infer<
  typeof OrganizationContactResponseSchema
>;

export type OrganizationUnit = z.infer<
  typeof OrganizationInfoSchema
>;
export type OrganizationPayload = z.infer<
  typeof OrganizationPayloadSchema
>;
export type OrganizationUnitPayload = z.infer<
  typeof OrganizationUnitPayloadSchema
>;
export type OrganizationUnitResponse = z.infer<
  typeof OrganizationUnitResponseSchema
>;

export type OrganizationUnitRespondent = z.infer<
  typeof OrganizationUnitRespondentSchema
>;

export type OrganizationUnitRespondentResponse = z.infer<
  typeof OrganizationUnitRespondentResponseSchema
>;

export type OrganizationUnitRespondentCreate = z.infer<
  typeof OrganizationUnitRespondentCreateSchema
>;

export type OrganizationUnitApprover = z.infer<
  typeof OrganizationUnitApproverSchema
>;

export type OrganizationUnitApproverResponse = z.infer<
  typeof OrganizationUnitApproverResponseSchema
>;

export type OrganizationUnitApproverRespondent = z.infer<
  typeof OrganizationUnitApproverRespondentSchema
>;

export type OrganizationUnitApproverRespondentResponse =
  z.infer<
    typeof OrganizationUnitApproverRespondentResponseSchema
  >;

export type OrganizationUnitAssignment = z.infer<
  typeof OrganizationUnitAssignmentSchema
>;

export type OrganizationUnitAssignmentResponse = z.infer<
  typeof OrganizationUnitAssignmentResponseSchema
>;

export type OrganizationUnitAssignmentRespondent =
  z.infer<
    typeof OrganizationUnitAssignmentRespondentSchema
  >;

export type OrganizationUnitAssignmentRespondentResponse =
  z.infer<
    typeof OrganizationUnitAssignmentRespondentResponseSchema
  >;

export type OrganizationUnitAssignmentGrowth = z.infer<
  typeof OrganizationUnitAssignmentGrowthSchema
>;

export type OrganizationUnitAssignmentGrowthResponse =
  z.infer<
    typeof OrganizationUnitAssignmentGrowthResponseSchema
  >;

export type OrganizationUnitAssignmentGrowthSectionResponse =
  z.infer<
    typeof OrganizationUnitAssignmentGrowthSectionResponseSchema
  >;

export type HCode = z.infer<typeof HCodeSchema>;
