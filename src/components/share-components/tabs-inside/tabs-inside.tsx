import { css } from '@emotion/css';
import { Tabs, TabsProps } from 'antd';

export type TabsInsideProps = TabsProps;

export const TabsInside = (
  tabsProps: TabsInsideProps
) => {
  return (
    <Tabs
      className={css`
        margin-top: -24px;
        margin-left: -25px !important;
        margin-right: -25px !important;

        .ant-tabs-nav {
          padding-top: 16px;
          margin-bottom: 0;
          background-color: #fff;

          .ant-tabs-nav-list {
            width: 100%;
            justify-content: center;
          }
        }
      `}
      {...tabsProps}
    />
  );
};
