import { z } from 'zod';

import { PolicyBuilderSectionSchema } from '@/schema/policy-builder';

export type PolicyBuilderSection = z.infer<
  typeof PolicyBuilderSectionSchema
>;
