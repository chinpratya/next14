import { z } from 'zod';

export const SmtpSchema = z.object({
  SMTP_HOST: z.string().optional(),
  SMTP_USERNAME: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_SSL: z.boolean().optional(),
  SMTP_TLS: z.boolean().optional(),
  SMTP_SENDER: z.string().optional(),
  SMTP_SENDER_NAME: z.string().optional(),
});
