import { ReactNode } from 'react';

export type Widget =
  | 'long-text'
  | 'short-text'
  | 'matrix'
  | 'matrix-mix'
  | 'check-box'
  | 'radio-box'
  | 'from-data'
  | 'question-group'
  | 'statement'
  | 'form-data';

export type Option = {
  label: string;
  value: string;
};

export type LongTextValue = string;

export type QuestionGroupValue = string;

export type CheckBoxValue = {
  check?: string[];
  isMore?: {
    [key: string]: string;
  };
};

export type ShortTextValue = string[];

export type RadioBoxValue = {
  check?: string;
  isMore?: {
    [key: string]: string;
  };
};

export type MatrixOptionRow = {
  key: string;
  label: string;
  isTitle?: boolean;
};

export type MatrixOptions = {
  type: 'radio' | 'checkbox';
  rows: MatrixOptionRow[];
  columns: string[];
};

export type MatrixValue = {
  [key: string]: string | string[];
};

export type UploadExtension = 'upload' | null;

export type FormDataOption = {
  key: string;
  title: string;
  type: 'radio' | 'checkbox';
  options: string[];
  upload?: boolean;
  uploadText?: string;
};

export type FormDataValues = {
  select: string;
  upload?: string;
};

export type Field = {
  key: string;
  widget: Widget;
  label?: string;
  required?: boolean;
  initialValue?: string | number | boolean;
  tooltip?: string | ReactNode;
  placeholder?: string;
  extensions?: Widget extends 'check-box'
    ? UploadExtension[]
    : Widget extends 'radio-box'
    ? UploadExtension[]
    : Widget extends 'form-data'
    ? UploadExtension[]
    : never;
  value?: Widget extends 'long-text'
    ? LongTextValue
    : Widget extends 'question-group'
    ? QuestionGroupValue
    : Widget extends 'check-box'
    ? CheckBoxValue
    : Widget extends 'radio-box'
    ? RadioBoxValue
    : Widget extends 'short-text'
    ? ShortTextValue
    : Widget extends 'matrix'
    ? MatrixValue
    : Widget extends 'form-data'
    ? FormDataValues[]
    : string;
  viewMode?: boolean;
  options?: Widget extends 'form-data'
    ? FormDataOption[]
    : string[];
  useAdditionalOption?: boolean;
  optionMore?: Widget extends 'check-box'
    ? boolean[]
    : Widget extends 'radio-box'
    ? boolean[]
    : Widget extends 'matrix'
    ? MatrixOptions
    : never;
};

export type FormItemWidget =
  | 'checkbox'
  | 'checkbox-group'
  | 'date-picker'
  | 'input'
  | 'number'
  | 'radio'
  | 'radio-group'
  | 'select'
  | 'switch'
  | 'textarea'
  | 'uploads'
  | 'image'
  | 'live'
  | 'image-link';
