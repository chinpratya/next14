import { z } from 'zod';

export type WebformBuilderWidget =
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

export type WebformBuilderLongTextOption = {
  title: string;
  value?: string;
  placeholder: string;
  additional?: boolean;
  attachment: boolean;
  attachmentValue?: string;
};

export type WebformBuilderShortTextOption =
  WebformBuilderLongTextOption;

export type WebformBuilderCheckBoxOption = {
  title: string;
  isMore: boolean;
  type: 'input' | 'attachment';
  placeholder?: string;
};

export type WebformBuilderFromDataOption = {
  type: 'input' | 'attachment' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  options?: string[];
};

export type WebformBuilderMatrixRowColumnOption = {
  type:
    | 'input'
    | 'attachment'
    | 'checkbox'
    | 'radio'
    | 'number';
  additional?: boolean;
  placeholder?: string;
  required?: boolean;

  uploadButtonText?: string;
  options?: Array<Record<string, unknown>>;
  label?: string;
  showOnRows?: number[];
};

export type WebformBuilderMatrixRowVisibility = {
  target: string;
  condition: 'equal' | 'not-equal';
  value: string;
};

export type WebformBuilderMatrixValue = {
  selected?: Record<string, unknown>;
  rows?: Record<string, unknown>;
  columns?: Record<string, Array<unknown>>;
};

export type WebformBuilderMatrixRow = {
  key: string;
  title: string;
  isMore?: boolean;
  isTitle?: boolean;
  options?: WebformBuilderMatrixRowColumnOption[];
};

export type WebformBuilderMatrixColumn = {
  key: string;
  title: string;
  type?: 'radio' | 'checkbox';
  isMore?: boolean;
  visibility?: WebformBuilderMatrixRowVisibility[];
  options?: WebformBuilderMatrixRowColumnOption[];
  children?: WebformBuilderMatrixColumn[];
};

export type WebformBuilderRadioBoxOption =
  WebformBuilderCheckBoxOption;

export const webformBuilderOptionSchema = z.array(
  z.any()
);

export type WebformBuilderOption = z.infer<
  typeof webformBuilderOptionSchema
>;

export type WebformBuilderIfLogic = {
  value: string | string[] | number | number[] | boolean;
  condition:
    | 'equal'
    | 'not-equal'
    | 'greater'
    | 'less'
    | 'contain'
    | 'not-contain'
    | 'greater-equal'
    | 'less-equal'
    | 'not-empty'
    | 'empty';
  target: string;
};

export type WebformBuilderElseLogic = {
  target: string;
};

export type WebformBuilderRule = {
  regex: string;
  errorMessage: string;
};

export type WebformBuilderItem = {
  key: string;
  alias?: string;
  title: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  message?: string;
  colon?: boolean;
  widget: WebformBuilderWidget;
  initialValue?: Record<string, unknown>;
  value?: Record<string, unknown>;
  options?: WebformBuilderOption;
  children?: WebformBuilderItem[];
  score?: Record<'result', number>;
  scores?: Array<Record<string, unknown>>;
  dependencyKey?: string;
  addOption?: boolean;
  maxOption?: number;
  maxWord?: boolean;
  maxWordCount?: number;
  nextButtonText?: string;
  previousButtonText?: string;
  quotationMarks?: boolean;
  multipleSelection?: boolean;
  verticalAlignment?: boolean;
  headerTitle?: string;
  readOnly?: boolean;
  rows?: WebformBuilderMatrixRow[];
  columns?: WebformBuilderMatrixColumn[];
  logic?: {
    if: WebformBuilderIfLogic[];
    else: WebformBuilderElseLogic;
  };
  rules?: WebformBuilderRule[];
};
