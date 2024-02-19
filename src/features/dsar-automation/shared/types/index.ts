import { z } from 'zod';

import { RightsStageSchema } from '../schemas';

export type RightsStageType = z.infer<
  typeof RightsStageSchema
>;
