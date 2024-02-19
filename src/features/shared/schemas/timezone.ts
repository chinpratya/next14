import { z } from 'zod';

export const DateTimeFormatSchema = z.object({
  datetime_intl: z.string(),
  datetime_strftime: z.string(),
  label: z.string(),
});

export const TimezoneResponseSchema = z.object({
  item: z.object({
    datetime_format: z.array(DateTimeFormatSchema),
    timezone: z.array(z.string()),
  }),
});
