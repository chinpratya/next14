import { ReactNode } from 'react';
import { z } from 'zod';

import { LanguageSchema, MetaSchema } from '@/schema';
import { Widget } from '@/types/form-builder';

export type Breadcrumb = {
  title: string;
  path?: string;
};

export type MenuItem = {
  key: string;
  label: string | ReactNode | JSX.Element;
  icon?: ReactNode;
  onClick?: () => void;
  children?: MenuItem[];
};

export type FieldInfo = {
  icon: JSX.Element | ReactNode;
  key: Widget;
  title: string;
  color: string;
};

export type LanguageMeta = z.infer<typeof LanguageSchema>;

export type Meta = z.infer<typeof MetaSchema>;
