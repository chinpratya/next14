import { z } from 'zod';

import {
  TotalCountSchema,
  DashboardGraphSchema,
  DashboardLawfulBasisResponseSchema,
  DashboardThirdPartyResponseSchema,
  DashboardMapThirdPartyResponseSchema,
  DashboardLawfulBasisSchema,
} from '../schemas';

export type TotalCount = z.infer<typeof TotalCountSchema>;

export type DashboardGraph = z.infer<
  typeof DashboardGraphSchema
>;
export type DashboardLawfulBasisType = z.infer<
  typeof DashboardLawfulBasisSchema
>;
export type DashboardLawfulBasisResponse = z.infer<
  typeof DashboardLawfulBasisResponseSchema
>;

export type DashboardThirdPartyResponse = z.infer<
  typeof DashboardThirdPartyResponseSchema
>;

export type DashboardMapThirdPartyResponse = z.infer<
  typeof DashboardMapThirdPartyResponseSchema
>;
