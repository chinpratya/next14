import type { SelectProps, FormItemProps } from 'antd';
import { z } from 'zod';

import {
  ConsentPolicySchema,
  ConsentPurposeSchema,
  ConsentActivitySchema,
  ConsentPropertiesSchema,
  ConsentFormItemSectionSchema,
  ConsentFormItemSchema,
  ConsentRuleSchema,
  ConsentFormSettingSchema,
  ConsentVisibilitySchema,
  ConsentFormSchema,
} from '../schema';

export type ConsentPolicyType = z.infer<
  typeof ConsentPolicySchema
>;

export type ConsentPurposeType = z.infer<
  typeof ConsentPurposeSchema
>;

export type ConsentActivityType = z.infer<
  typeof ConsentActivitySchema
>;

export type ConsentVisibilityType = z.infer<
  typeof ConsentVisibilitySchema
>;

export type ConsentPropertiesType = z.infer<
  typeof ConsentPropertiesSchema
>;

export type ConsentFormItemSectionType = z.infer<
  typeof ConsentFormItemSectionSchema
>;

export type ConsentFormItemType = z.infer<
  typeof ConsentFormItemSchema
>;

export type ConsentRuleType = z.infer<
  typeof ConsentRuleSchema
>;

export type ConsentFormSettingType = z.infer<
  typeof ConsentFormSettingSchema
>;

export type ConsentFormType = z.infer<
  typeof ConsentFormSchema
>;

export type ConsentFormLanguage = {
  languageId: string;
  languageName: string;
};

export type ConsentActivityTypeOption = {
  name: string;
  base?: string;
  activityID: string;
};

export type ConsentActivityTypeWidgetProps = Omit<
  SelectProps,
  'options'
> & {
  options?: ConsentActivityTypeOption[];
};

export type ConsentActivityTypeItem = FormItemProps & {
  widgetProps?: ConsentActivityTypeWidgetProps;
};
