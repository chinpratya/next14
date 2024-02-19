import {
  DownOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Dropdown, Grid } from 'antd';
import dayjs from 'dayjs';
import i18n from 'i18next';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useEffect } from 'react';

import lang from '@/assets/data/language.json';
import { useTheme } from '@/stores/theme';
import utils from '@/utils';
import { Flex } from '@components/flex';
import { css } from '@emotion/css';

const { useBreakpoint } = Grid;

const getLanguageDetail = (locale: string) =>
  lang?.find((elm) => elm.langId === locale);

const getLanguageItems = (locale: string) =>
  lang
    ?.filter((elm) => elm.langId !== locale)
    .map((elm) => ({
      label: elm.langName,
      key: elm.langId,
    }));

export type NavLanguageProps = {
  fontSize?: number;
  hideLanguage?: boolean;
};

export const NavLanguage = ({
  fontSize = 22,
  hideLanguage = false,
}: NavLanguageProps) => {
  const { locale, onLocaleChange } = useTheme();

  const isMobile = utils
    .getBreakPoint(useBreakpoint())
    .includes('xs');

  const language = getLanguageDetail(locale);

  const onLanguageChange = ({ key }: MenuInfo) => {
    onLocaleChange(key);
    i18n.changeLanguage(key);
  };

  useEffect(() => {
    dayjs.locale(locale);
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      menu={{
        items: getLanguageItems(locale),
        onClick: onLanguageChange,
      }}
      overlayStyle={{ position: 'fixed' }}
    >
      <a
        href="#/"
        className="text-gray d-flex align-items-center"
        onClick={(e) => e.preventDefault()}
      >
        {hideLanguage || isMobile ? (
          <GlobalOutlined
            className="mr-2"
            style={{ fontSize: fontSize }}
          />
        ) : (
          <Flex
            alignItems="center"
            justifyContent="between"
          >
            <GlobalOutlined
              className="mr-2"
              style={{ fontSize: fontSize }}
            />
            {language?.langName}
            <DownOutlined className="ml-1 mr-4" />
          </Flex>
        )}
      </a>
    </Dropdown>
  );
};
