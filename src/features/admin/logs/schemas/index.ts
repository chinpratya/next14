import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const endpointSchema = z.object({
  raw: z.string().optional(),
  path: z.string().optional(),
});

export const LogOrganizationSchemas = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  project: z.string().optional(),
  module: z.string().optional(),
  method: z.string().optional(),
  endpoint: endpointSchema.optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  browser: z.string().optional(),
  user_os: z.string().optional(),
  device_type: z.string().optional(),
  request_type: z.string().optional(),
  request_id: z.string().optional(),
  organization: z.string().optional(),
  country: z.string().optional(),
  ObjectUUID: z.string().optional(),
  created_dt: z.string().optional(),
  created_by: z.string().optional(),
  updated_dt: z.string().optional(),
  updated_by: z.string().optional(),
});

export const LogOrganizationResponseSchemas =
  ResponseSchema.extend({
    data: z.array(LogOrganizationSchemas),
  });
