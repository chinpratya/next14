import { z } from 'zod';

import { StratumSchema, SettingSchema } from '../schemas';

export type Stratum = z.infer<typeof StratumSchema>;

export type Setting = z.infer<typeof SettingSchema>;
