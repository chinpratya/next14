import { Grid, Image } from 'antd';
import { useRouter } from 'next/router';

import { APP_NAME } from '@/config/constants';
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
} from '@/config/theme';
import { useTheme } from '@/stores/theme';
import utils from '@/utils';

const { useBreakpoint } = Grid;

export type LogoProps = {
  mobileLogo?: boolean;
  logoType?: 'light' | 'dark';
  navSideEnable?: boolean;
};

export const Logo = ({
  mobileLogo,
  navSideEnable = true,
}: LogoProps) => {
  const isMobile = !utils
    .getBreakPoint(useBreakpoint())
    .includes('lg');

  const { navCollapsed } = useTheme();
  const router = useRouter();

  const getLogoWidthGutter = (): number => {
    if (isMobile && !mobileLogo) {
      return 0;
    }
    if (navCollapsed && navSideEnable) {
      return SIDE_NAV_COLLAPSED_WIDTH;
    } else {
      return SIDE_NAV_WIDTH;
    }
  };

  const getLogo = () => {
    if (navCollapsed && navSideEnable) {
      return '/img/logo-sm.png';
    }
    return '/img/logo.png';
  };

  const getLogoDisplay = () => {
    if (isMobile && !mobileLogo) {
      return 'd-none cursor-pointer';
    } else {
      return 'logo cursor-pointer';
    }
  };

  const onLogoClick = () => {
    const current = utils.getNavigationApp(router.asPath);
    const url = current
      ? `/apps?appId=${current}`
      : '/apps?appId=datafence';

    router.replace(url, undefined, {
      shallow: true,
    });
  };

  return (
    <div
      className={getLogoDisplay()}
      style={{ width: `${getLogoWidthGutter()}px` }}
    >
      <Image
        height={70}
        src={`${getLogo()}`}
        alt={`${APP_NAME} logo`}
        preview={false}
        onClick={onLogoClick}
      />
    </div>
  );
};
