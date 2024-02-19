import { z } from 'zod';

import { IconSchema } from '../schemas/icon';

export type Icon = z.infer<typeof IconSchema>;
