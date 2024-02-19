import { z } from 'zod';

import {
  SystemUsageHistoryResponseSchemas,
  SystemUsageHistorySchemas,
} from '../schemas';

export type SystemUsageHistoryResponse = z.infer<
  typeof SystemUsageHistoryResponseSchemas
>;

export type SystemUsageHistory = z.infer<
  typeof SystemUsageHistorySchemas
>;
