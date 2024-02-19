import { useSetState } from '@mantine/hooks';
import React, { createContext, useMemo } from 'react';

export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export type SettingPreview =
  | 'banner'
  | 'icon'
  | 'preference';

export type BannerContextProviderState = {
  deviceView: DeviceView;
  settingPreview: SettingPreview;
  currentLanguage: string;
};

export type BannerContextType =
  BannerContextProviderState & {
    onChangeDeviceView: (
      deviceView: BannerContextProviderState['deviceView']
    ) => void;
    onChangeSettingPreview: (
      settingPreview: BannerContextProviderState['settingPreview']
    ) => void;
    onChangeCurrentLanguage: (
      currentLanguage: BannerContextProviderState['currentLanguage']
    ) => void;
  };

export type BannerContextProviderProps = {
  children: React.ReactNode;
  onLanguageChange?: (
    currentLanguage: BannerContextProviderState['currentLanguage']
  ) => void;
};

export const BannerContext =
  createContext<BannerContextType | null>(null);

export const BannerContextProvider = ({
  children,
  onLanguageChange,
}: BannerContextProviderProps) => {
  const [state, setState] =
    useSetState<BannerContextProviderState>({
      deviceView: 'desktop',
      settingPreview: 'banner',
      currentLanguage: 'th',
    });

  const contextState = useMemo<BannerContextType>(() => {
    const onChangeDeviceView = (
      deviceView: BannerContextProviderState['deviceView']
    ) => setState({ deviceView });

    const onChangeSettingPreview = (
      settingPreview: BannerContextProviderState['settingPreview']
    ) => setState({ settingPreview });

    const onChangeCurrentLanguage = (
      currentLanguage: BannerContextProviderState['currentLanguage']
    ) => {
      onLanguageChange?.(currentLanguage);
      setState({ currentLanguage });
    };

    return {
      ...state,
      onChangeDeviceView,
      onChangeSettingPreview,
      onChangeCurrentLanguage,
    };
  }, [state, setState]);

  return (
    <BannerContext.Provider value={contextState}>
      {children}
    </BannerContext.Provider>
  );
};
