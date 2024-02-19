import { Locale } from 'antd/lib/locale-provider';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { theme } from '@/config/theme';
import { themeStore } from '@/stores/theme';

import enLang from './entries/en_US';
import thLang from './entries/th_TH';

export * from './tokens';

export type LocalResource = {
  translation: {
    [key: string]: string;
  };
  antd: Locale;
};

export const resources = {
  en: {
    translation: enLang.messages,
    antd: enLang.antd,
  },
  th: {
    translation: thLang.messages,
    antd: thLang.antd,
  },
} as {
  [key: string]: LocalResource;
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: theme.locale,
  lng: themeStore.getState().locale ?? theme.locale,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
