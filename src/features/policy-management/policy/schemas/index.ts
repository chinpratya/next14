import { z } from 'zod';

import { ResponseSchema } from '@/schema';

export const PolicySectionSchema = z.object({
  section_name: z.string(),
  component: z.array(z.record(z.unknown())),
  visibility: z.array(z.unknown()).optional(),
});

export const PolicyFormFieldsFormSchema = z.object({
  name: z.string(),
  section: z.array(PolicySectionSchema),
});

export const PolicyFormFieldsSchema = z.object({
  form: z.array(PolicyFormFieldsFormSchema),
});

export const PolicyContentSchema = z.object({
  header_logo: z.string(),
  action: z.string(),
});

export const PolicyFormSchema = z.object({
  form_fields: PolicyFormFieldsSchema.optional(),
  content: PolicyContentSchema.optional(),
});

export const PolicyFormSectionSchema = z.object({
  name: z.string(),
  description: z.string(),
  hide: z.boolean(),
  value: z.string(),
  key: z.string(),
});

export const PolicyLanguageFormSchema = z.object({
  form_fields: PolicyFormFieldsSchema.optional(),
  form_sections: z
    .array(PolicyFormSectionSchema)
    .optional(),
  template_data_id: z.string().optional(),
  template_id: z.string().optional(),
  type: z
    .object({
      template_id: z.string().optional(),
      template_name: z.string().optional(),
    })
    .optional(),
});

export const PolicyLanguageDetailSchema = z.object({
  form: PolicyLanguageFormSchema.optional(),
  language: z.string().optional(),
  languageName: z.string().optional(),
});

export const PolicySchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  review_approval_required: z.boolean().nullable(),
  language: z.array(z.string()),
  organization: z.string().nullable(),
  review_period: z.string().nullable(),
  days_earlier: z.number().nullable(),
  system_or_service: z.string().nullable(),
  processing_activities: z.string().nullable(),
  attach_file: z.string().nullable(),
  personalize: PolicyFormSchema.nullable(),
  action: z.string(),
  template: z
    .object({
      template_id: z.string(),
      template_name: z.string(),
    })
    .nullable(),
  website: z.string().nullable(),
  status: z.string().nullable(),
  signing_date: z.string().nullable(),
  effective_date: z.string().nullable(),
  preview_document: z
    .array(
      z.object({
        signature: z.object({
          attach_sugnature: z.string(),
          pagr_signature: z.boolean(),
          signer_name: z.string(),
          position: z.string(),
        }),
        form_fields: z.array(z.object({})),
      })
    )
    .nullable(),
  workflow: z.string().nullable(),
  version: z.string().optional(),
  created_at: z.string(),
  created_by: z.string(),
  tagName: z.array(z.string()).optional(),
  tagID: z.array(z.string()).optional(),
  policy_type: z.string().optional(),
  policy_type_name: z.string().optional(),
  settings: z
    .object({
      isReview: z.boolean(),
      policy_review_schedule: z.string(),
      reminder_before_due_date: z.string(),
    })
    .optional(),
  updated_at: z.string().optional(),
});

export const PolicyResponseSchema = ResponseSchema.extend(
  {
    data: z.array(PolicySchema),
  }
);

export const PolicyVersionSchema = z.object({
  ObjectUUID: z.string(),
  action: z.string(),
  created_at: z.string(),
  created_by: z.string(),
  days_earlier: z.string().nullable(),
  description: z.string().nullable(),
  effective_date: z.string().nullable(),
  isDelete: z.string(),
  isPublish: z.string(),
  language: z.array(z.string()),
  name: z.string(),
  personalize: z.string().nullable(),
  policy_created_form: z.string(),
  policy_type: z.string(),
  processing_activities: z.string().nullable(),
  review_period: z.string().nullable(),
  signing_date: z.string().nullable(),
  status: z.string(),
  system_or_service: z.string().nullable(),
  template: z.string(),
  updated_at: z.string(),
  versions: z.string().optional(),
  version: z.string().optional(),
  website: z.string().nullable(),
});

export const PolicyVersionResponseSchema =
  ResponseSchema.extend({
    data: z.array(PolicyVersionSchema),
  });

export const PolicyUserSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  organization: z.array(z.string()),
  position: z.array(z.string()),
});
export const PolicyUserResponseSchema =
  ResponseSchema.extend({
    data: z.array(PolicyUserSchema),
  });

export const PolicyLanguageSchema = z.object({
  languageId: z.string().optional(),
  languageName: z.string().optional(),
});

export const PolicyLanguageResponseSchema =
  ResponseSchema.extend({
    data: z.array(PolicyLanguageSchema),
  });

export const LangMetaSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string().nullable(),
  nativeName: z.string().nullable().optional(),
});

export const PolicyLangMetaSchema = z.object({
  DefaultLanguage: z.array(LangMetaSchema),
  Language: z.array(LangMetaSchema),
  identifyType: z.array(LangMetaSchema),
});

export const PolicyDetailSchema = z.object({
  ObjectUUID: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  language: z.array(z.string()),
  organization: z.string().nullable(),
  review_period: z.string().nullable(),
  days_earlier: z.string().nullable(),
  system_or_service: z.string().nullable(),
  processing_activities: z.string().nullable(),
  attach_file: z.string().nullable(),
  personalize: z.string().nullable(),
  website: z.string().nullable(),
  status: z.string().nullable(),
  signing_date: z.string().nullable(),
  effective_date: z.string().nullable(),
  preview_document: z.string().nullable(),
  workflow: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  updated_at: z.string(),
  version: z.string().optional(),
  tagName: z.array(z.string()).optional(),
  tagID: z.array(z.string()).optional(),
  policy_type: z.string().optional(),
  form_setting: z.record(z.any()).optional(),
  settings: z.record(z.unknown()).optional(),
});

const TypeSchema = z.object({
  th: z.object({
    template_id: z.string(),
    template_name: z.string(),
  }),
  en: z.object({
    template_id: z.string(),
    template_name: z.string(),
  }),
});

export const TemplateSchema = z.object({
  template_data_id: z.string(),
  template_name: z.string(),
  template_type: z.string(),
});

export const PolicyTemplateFormFieldsSchema = z.object({
  form: z.array(PolicyFormFieldsFormSchema),
});

export const PolicyTemplateSchema = z.object({
  type: z.array(TypeSchema),
  template: z.object({
    cctv_policy_template: z.array(
      z.object({
        th: TemplateSchema,
        en: TemplateSchema,
      })
    ),
    cookie_policy_template: z.array(
      z.object({
        th: TemplateSchema,
        en: TemplateSchema,
      })
    ),
    customer_privacy_policy_template: z.array(
      z.object({
        th: TemplateSchema,
        en: TemplateSchema,
      })
    ),
    privacy_policy_template: z.array(
      z.object({
        th: TemplateSchema,
        en: TemplateSchema,
      })
    ),
    data_processing_template: z.array(
      z.object({
        th: TemplateSchema,
        en: TemplateSchema,
      })
    ),
    employee_policy_template: z.array(
      z.object({
        th: TemplateSchema,
        en: TemplateSchema,
      })
    ),
    vendor_policy_template: z.array(
      z.object({
        th: TemplateSchema,
        en: TemplateSchema,
      })
    ),
  }),
});

export const FormSectionSchema = z.object({
  name: z.string(),
  description: z.string(),
  hide: z.boolean(),
  value: z.string(),
  key: z.string(),
});

export const SectionSchema = z.object({
  component: z.array(z.record(z.unknown())),
  section_name: z.string(),
});

export const FormSchema = z.object({
  name: z.string(),
  section: z.array(SectionSchema),
});

export const FormFieldSchema = z.object({
  form: z.array(FormSchema),
});

export const FormPolicySchema = z.object({
  form_fields: FormFieldSchema,
  form_sections: z.array(FormSectionSchema),
  template_data_id: z.string(),
  template_id: z.string(),
  type: z.object({
    template_id: z.string(),
    template_name: z.string(),
  }),
});

export const PolicyPreviewSchema = z.object({
  form: FormPolicySchema,
  language: z.string(),
  languageName: z.string(),
});

export const PolicyTemplateFormSchema = z.object({
  form_fields: PolicyTemplateFormFieldsSchema,
  form_setting: z.record(z.any()).optional().nullable(),
  form_sections: z
    .array(PolicyFormSectionSchema)
    .optional(),
  ObjectUUID: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  updated_at: z.string().optional(),
});
