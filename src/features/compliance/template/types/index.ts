import { z } from 'zod';

import {
  TemplateSettingEmailSchema,
  TemplateSettingPortalSchema,
  TemplateSettingSchema,
} from '../schemas';

export type TemplateSettingEmail = z.infer<
  typeof TemplateSettingEmailSchema
>;

export type TemplateSettingPortal = z.infer<
  typeof TemplateSettingPortalSchema
>;

export type TemplateSetting = z.infer<
  typeof TemplateSettingSchema
>;
