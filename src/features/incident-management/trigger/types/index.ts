import { z } from 'zod';

import { RuleDetail } from '../schemas';

export type RuleDetails = z.infer<typeof RuleDetail>;
