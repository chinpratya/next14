import { z } from 'zod';

import { EntitySchema, ResponseSchema } from '@/schema';

export const DataControllerSchema = EntitySchema.extend({
  dataProcessorID: z.string(),
  name: z.string(),
  organizationID: z.string(),
  organizationName: z.string(),
  position: z.string(),
  positionID: z.string(),
  organizationType: z.string(),
  organizationTypeID: z.string(),
  personalType: z.string(),
  personalTypeID: z.string(),
  userID: z.string().optional(),
  userName: z.string().optional(),
  email: z.string(),
  tel: z.string().optional(),
  address: z.string(),
  url: z.string().optional(),
  note: z.string().optional(),
  countryID: z.string().optional(),
  country: z.string().optional(),
});

export const DataControllerMataSchema = z.record(
  z.string(),
  z.array(
    z.object({
      ObjectUUID: z.string(),
      name: z.string(),
    })
  )
);

export const DataControllersSchema =
  DataControllerSchema.omit({
    organizationID: true,
    positionID: true,
    organizationTypeID: true,
    personalTypeID: true,
    address: true,
  });

export const DataControllersResponseSchema =
  ResponseSchema.extend({
    data: z.array(DataControllersSchema),
  });
