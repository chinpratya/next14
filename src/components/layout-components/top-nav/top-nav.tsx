import { NAV_TYPE_TOP } from '@/config/theme';
import { useTheme } from '@/stores/theme';
import utils from '@/utils';

import { MenuContent } from '../menu-content';

export const TopNav = () => {
  const { topNavColor } = useTheme();
  return (
    <div
      className={`top-nav ${utils.getColorContrast(
        topNavColor
      )}`}
      style={{ backgroundColor: topNavColor }}
    >
      <div className="top-nav-wrapper">
        <MenuContent
          type={NAV_TYPE_TOP}
          topNavColor={topNavColor}
        />
      </div>
    </div>
  );
};
