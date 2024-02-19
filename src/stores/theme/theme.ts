import { useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { theme, ThemeType } from '@/config/theme';

export interface ThemeStore extends ThemeType {
  toggleCollapsedNav: (navCollapsed: boolean) => void;
  onMobileNavToggle: (mobileNav: boolean) => void;
  onLocaleChange: (locale: string) => void;
  onForceUpdateMenu: () => void;
}

export const themeStore = createStore<ThemeStore>()(
  persist(
    (set, getState) => ({
      ...theme,
      ...getState(),
      toggleCollapsedNav: (navCollapsed) => {
        set({ navCollapsed });
      },
      onMobileNavToggle: (mobileNav) => {
        set({ mobileNav });
      },
      onLocaleChange: (locale) => {
        set({ locale });
      },
      onForceUpdateMenu: () => {
        set((state) => ({
          isForceUpdatedMenu: !state.isForceUpdatedMenu,
        }));
      },
    }),
    {
      name: 'theme',
    }
  )
);

export const useTheme = () => useStore(themeStore);
