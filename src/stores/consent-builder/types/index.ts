import { z } from 'zod';

import {
  ConsentVisibilityType,
  FormItemWidget,
} from '@/types';

import {
  ConsentBuilderFormSchema,
  ConsentBuilderFormLanguageSchema,
} from '../schemas';

export type ConsentBuilderFormType = z.infer<
  typeof ConsentBuilderFormSchema
>;

export type ConsentBuilderFormLanguageType = z.infer<
  typeof ConsentBuilderFormLanguageSchema
>;
export type ConsentFormSectionType = {
  id: string;
  name: string;
  components?: Array<Record<string, unknown>>;
};

export type ConsentSettingType = {
  page?: Record<string, unknown>;
  form?: Record<string, unknown>;
};

export type ConsentFormItemsType = {
  id: string;
  name: string;
  sections?: Array<ConsentFormSectionType>;
};

export type ConsentBuilderForm = {
  formSetting: ConsentSettingType;
  formItems: ConsentFormItemsType[];
};

export type ConsentBuilderStore = {
  storeId?: string;
  currentFormId: string;
  currentFormIndex: number;
  currentSectionId: string;
  currentSectionIndex: number;
  formSetting: ConsentSettingType;
  formItems: ConsentFormItemsType[];
  onSetStoreId: (storeId: string) => void;
  onInitiateForm: (form?: ConsentBuilderForm) => void;
  reset: () => void;
};

export interface FormSlice {
  onAddForm: () => void;
  onDeleteForm: (formId: string) => void;
}

export interface FieldSlice {
  openFieldSetting: boolean;
  currentField: FormItemWidget | null;
  toggleFieldSetting: (fieldId?: string) => void;
  onChangeField: (field: Record<string, unknown>) => void;
  onAddField: (field: string) => void;
  onDropField: (
    sectionId: string,
    field: FormItemWidget,
    position: number
  ) => void;
}

export interface RequestTypeSlice {
  openRequestTypeSetting: boolean;
  currentRequestType: Record<string, unknown> | null;
  toggleRequestTypeSetting: (requestId?: string) => void;
  onChangeRequestType: (
    request: Record<string, unknown>
  ) => void;
  onAddRequestType: (request: string) => void;
  onDropRequestType: (
    sectionId: string,
    request: FormItemWidget,
    position: number
  ) => void;
}

export interface RequestTypeDsarSlice {
  openRequestTypeDsarSetting: boolean;
  currentRequestTypeDsar: Record<string, unknown> | null;
  toggleRequestTypeDsarSetting: (
    requestId?: string
  ) => void;
  onChangeRequestTypeDsar: (
    request: Record<string, unknown>
  ) => void;
  onAddRequestTypeDsar: (request: string) => void;
  onDropRequestTypeDsar: (
    sectionId: string,
    request: FormItemWidget,
    position: number
  ) => void;
}

export interface IdentifierSlice {
  listIdentifiers: Record<string, unknown>[];
  usedIdentifierIds: string[];
  openIdentifierSetting: boolean;
  currentIdentifier: FormItemWidget | null;
  toggleIdentifierSetting: (
    identifierId?: string
  ) => void;
  onChangeIdentifier: (
    identifier: Record<string, unknown>
  ) => void;
  onAddIdentifier: (identifierId: string) => void;
  onDropIdentifier: (
    sectionId: string,
    identifierId: string,
    position: number
  ) => void;
}

export interface SectionSlice {
  isOpenSectionSetting: boolean;
  onToggleSectionSetting: (sectionId?: string) => void;
  currentSection: Record<string, unknown> | null;
  onChangeSectionSetting: (
    setting: Record<string, unknown>
  ) => void;
  onAddSection: () => void;
  onDeleteSection: (sectionId: string) => void;
  onChangeSelectedSection: (sectionId: string) => void;
  onMoveUpSection: (sectionId: string) => void;
  onMoveDownSection: (sectionId: string) => void;
}

export interface PurposeSlice {
  isOpenPurposeSetting: boolean;
  currentPurpose: Record<string, unknown> | null;
  onTogglePurposeSetting: (purposeId?: string) => void;
  onChangePurpose: (
    setting: Record<string, unknown>
  ) => void;
  usedPurposeIds: string[];
  onAddPurpose: (purposeId: string) => void;
  onDropPurpose: (
    sectionId: string,
    purposeId: string,
    position: number
  ) => void;
}

export interface ActivitySlice {
  usedActivityIds: string[];
  onAddActivity: (activityId: string) => void;
  onDropActivity: (
    sectionId: string,
    activityId: string,
    position: number
  ) => void;
}

export interface ComponentSlice {
  onMoveComponent: (
    sourceSectionId: string,
    sourceIndex: number,
    destinationSectionId: string,
    destinationIndex: number
  ) => void;
  onMoveUpComponent: (componentId: string) => void;
  onMoveDownComponent: (componentId: string) => void;
  onDeleteComponent: (componentId: string) => void;
}

export interface FormSettingSlice {
  onChangeFormSetting: (
    setting: Record<string, unknown>
  ) => void;
  onChangeFormSettingContent: (
    type: 'header' | 'footer',
    content: string
  ) => void;
}

export interface LabelSlice {
  isOpenLabelSetting: boolean;
  currentLabel: Record<string, unknown> | null;
  onToggleLabelSetting: (labelId?: string) => void;
  onChangeLabelSetting: (
    setting: Record<string, unknown>
  ) => void;
  onAddLabel: (label?: string) => void;
  onDropLabel: (
    sectionId: string,
    position: number
  ) => void;
}

export interface ConditionSlice {
  formConditions: ConsentVisibilityType[];
  quickAddCondition: (
    type: 'workflow' | 'visibility'
  ) => void;
  deleteCondition: (conditionId: string) => void;
  updateCondition: (
    conditionId: string,
    condition: ConsentVisibilityType
  ) => void;
}

export interface TranslationSlice {
  selectedLanguage: string | null;
  selectedTranslateContentId: string[] | null;
  openAddLanguage: boolean;
  defaultFormItems?: ConsentFormItemsType[];
  onChangeSelectedLanguage: (language: string) => void;
  onToggleAddLanguage: () => void;
  onSetDefaultForm: ({
    formItems,
  }: {
    formItems: ConsentFormItemsType[];
  }) => void;
  onChangeSelectedTranslateContent: (
    contentId: string[]
  ) => void;
}

export interface ActivityTypeSlice {
  openActivityTypeSetting: boolean;
  currentActivityType: Record<string, unknown> | null;
  onToggleActivityTypeSetting: (
    activityTypeId?: string
  ) => void;
  onChangeActivityType: (
    activityType: Record<string, unknown>
  ) => void;
}
