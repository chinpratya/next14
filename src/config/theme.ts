export const ROW_GUTTER = 16;
export const SIDE_NAV_WIDTH = 250;
export const SIDE_NAV_COLLAPSED_WIDTH = 80;
export const SIDE_NAV_LIGHT = 'SIDE_NAV_LIGHT';
export const SIDE_NAV_DARK = 'SIDE_NAV_DARK';
export const NAV_TYPE_SIDE = 'SIDE';
export const NAV_TYPE_TOP = 'TOP';
export const DIR_LTR = 'ltr';
export const DIR_RTL = 'rtl';
export const BORDER_COLOR = '#e8e8e8';

export type ThemeType = {
  navCollapsed: boolean;
  sideNavTheme: string;
  locale: string;
  navType: string;
  topNavColor: string;
  headerNavColor: string;
  mobileNav: boolean;
  currentTheme: string;
  direction: 'ltr' | 'rtl';
  blankLayout: boolean;
  isForceUpdatedMenu: boolean;
};

export const theme = {
  navCollapsed: false,
  sideNavTheme: SIDE_NAV_LIGHT,
  locale: 'en',
  navType: NAV_TYPE_SIDE,
  topNavColor: '#3e82f7',
  headerNavColor: '',
  mobileNav: false,
  currentTheme: 'light',
  direction: DIR_LTR,
  blankLayout: false,
  isForceUpdatedMenu: false,
} as ThemeType;
