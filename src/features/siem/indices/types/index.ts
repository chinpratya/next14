import { z } from 'zod';

import {
  IndiceSchema,
  IndiceDetailSchema,
  indiceResponseSchema,
  MonitorResponseSchema,
  MonitorSchema,
  NotifyListSchema,
  NotifyListResponseSchema,
  HostResponseSchema,
  OptionSchema,
  OptionResponseSchema,
  IndiceStorageSchema,
} from '../schemas';

export type Indice = z.infer<typeof IndiceSchema>;

export type IndiceResponse = z.infer<
  typeof indiceResponseSchema
>;

export type IndiceDetail = z.infer<
  typeof IndiceDetailSchema
>;

export type Monitor = z.infer<typeof MonitorSchema>;

export type MonitorResponse = z.infer<
  typeof MonitorResponseSchema
>;

export type NotifyList = z.infer<typeof NotifyListSchema>;

export type NotifyListResponse = z.infer<
  typeof NotifyListResponseSchema
>;

export type HostResponse = z.infer<
  typeof HostResponseSchema
>;

export type Option = z.infer<typeof OptionSchema>;

export type OptionResponse = z.infer<
  typeof OptionResponseSchema
>;

export type IndiceStorage = z.infer<
  typeof IndiceStorageSchema
>;
