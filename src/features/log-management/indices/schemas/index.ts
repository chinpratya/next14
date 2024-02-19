import { z } from 'zod';

import { ResponseCyberFenceSchema } from '@/schema';

export const IndiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  current_size: z.number(),
  storage: z.number(),
  event_count: z.number(),
  retention: z.number(),
  created_date: z.string(),
  created_by: z.string(),
  forward_siem: z.boolean().optional(),
});

export const IndiceDetailSchema = z.object({
  id: z.string(),
  alias_name: z.string().optional(),
  organization: z.string(),
  mode: z.enum(['CLOUD', 'ON-PREMISE']).optional(),
  module: z.string(),
  name: z.string(),
  description: z.string(),
  retention: z.number(),
  notify: z.number(),
  storage: z.number(),
  status: z.string(),
  created_date: z.string(),
  created_by: z.string(),
  updated_by: z.string(),
  updated_date: z.string(),
  certificate: z.string(),
  hostname: z.string(),
  port: z.array(z.number()),
  current_size: z.number(),
});

export const indiceResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(IndiceSchema),
  });

export const OptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const OptionResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(OptionSchema),
  });

export const MonitorSchema = z.object({
  _id: z.string(),
  organization: z.string(),
  notify: z.array(z.string()).nullable(),
  module: z.string(),
  description: z.string(),
  indices: z.string(),
  hostname: z.string(),
  monitor_type: z.string(),
  interval_time: z.number(),
  internal_ignore: z.number(),
  interval_timestamp: z.string(),
  life_cycle: z
    .array(
      z.object({
        value: z.number(),
        severity: z.string(),
        is_global: z.boolean(),
      })
    )
    .nullable(),
  status: z.string(),
  created_by: z.string(),
  created_date: z.string(),
  updated_by: z.string(),
  updated_date: z.string(),
  alias_name: z.string().optional(),
});

export const MonitorResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(MonitorSchema),
  });

export const NotifyListSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const NotifyListResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(NotifyListSchema),
  });

export const HostResponseSchema = z.array(
  z.object({
    label: z.string(),
    value: z.string(),
  })
);

export const IndiceStorageSchema = z.object({
  total: z.number(),
  used: z.number(),
  free: z.number(),
  usedUnit: z.string(),
  freeUnit: z.string(),
});

export const ForwardingSchema = z.object({
  id: z.string(),
  indices: z.string(),
  organization: z.string(),
  name: z.string(),
  host: z.string(),
  port: z.number().optional(),
  protocol: z.string(),
  ssl_cacert: z.string(),
  ssl_cert: z.string(),
  ssl_key: z.string(),
  ssl_key_passphrase: z.string(),
  ssl_verify: z.boolean(),
  created_by: z.string(),
  updated_by: z.string(),
  created_date: z.string(),
  updated_date: z.string(),
  filter: z.object({
    host: z.string(),
    severity: z.array(z.unknown()),
    facility: z.array(z.unknown()),
    message: z.string(),
  }),
});

export const IndicesStorageSizeSchema = z.object({
  total_storage: z.number(),
});

export const ForwardingResponseSchema =
  ResponseCyberFenceSchema.extend({
    data: z.array(ForwardingSchema),
  });
