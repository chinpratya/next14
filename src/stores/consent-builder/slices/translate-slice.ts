import { StateCreator } from 'zustand';

import {
  ConsentBuilderStore,
  TranslationSlice,
} from '../types';

export const createTranslationSlice: StateCreator<
  ConsentBuilderStore & TranslationSlice,
  [],
  [],
  TranslationSlice
> = (set) => ({
  selectedLanguage: null,
  selectedTranslateContentId: null,
  openAddLanguage: false,
  defaultFormItems: [],
  onChangeSelectedLanguage: (language: string) =>
    set(() => ({ selectedLanguage: language })),
  onToggleAddLanguage: () =>
    set((state) => ({
      openAddLanguage: !state.openAddLanguage,
    })),
  onSetDefaultForm: ({ formItems }) =>
    set(() => ({ defaultFormItems: formItems })),
  onChangeSelectedTranslateContent: (contentId) =>
    set(() => ({
      selectedTranslateContentId: contentId,
    })),
});
