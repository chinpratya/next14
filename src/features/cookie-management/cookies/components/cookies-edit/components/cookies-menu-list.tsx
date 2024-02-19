import { Badge, Menu } from 'antd';
import Scrollbars from 'react-custom-scrollbars';

import {
  CookieCategory,
  CookieItem,
} from '../../../types';

export type CookiesMenuListProps = {
  currentCookie: string;
  onChange: (cookieId: string) => void;
  cookies: CookieItem[];
  categories: CookieCategory[];
};

export const CookiesMenuList = ({
  currentCookie,
  onChange,
  cookies,
  categories,
}: CookiesMenuListProps) => {
  const getCookieBadge = (cookie: CookieItem) => {
    const category = categories.find(
      (category) =>
        category.cetegory_name === cookie.category
    );

    return category?.background ?? '#f5f5f5';
  };

  return (
    <Scrollbars autoHide autoHideTimeout={1000}>
      <Menu
        selectedKeys={[currentCookie]}
        onClick={({ key }) => onChange(key.toString())}
        mode="inline"
        items={cookies.map((cookies) => ({
          key: `${cookies.name}|${cookies.domain}`,
          label: cookies.name,
          icon: <Badge color={getCookieBadge(cookies)} />,
        }))}
      />
    </Scrollbars>
  );
};
