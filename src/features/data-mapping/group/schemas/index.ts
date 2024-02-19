import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const GroupSchema = EntitySchema.extend({
  groupID: z.string(),
  name: z.string(),
  menuID: z.string(),
  menuName: z.string(),
  organizationID: z.string(),
  organizationName: z.string(),
});

export const GroupMetaSchema = z.object({
  menu: z.array(
    z.object({
      ObjectUUID: z.string(),
      name: z.string(),
    })
  ),
});

export const GroupResponseSchema = ResponseSchema.extend({
  data: z.array(GroupSchema),
});
