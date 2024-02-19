import { z } from 'zod';

import { SmtpSchema } from '../schemas';

export type SMTP = z.infer<typeof SmtpSchema>;
