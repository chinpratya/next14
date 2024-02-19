import { css } from '@emotion/css';
import { motion } from 'framer-motion';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ToggleCollage } from '@components/toggle-collage';

export type SideSettingLayoutProps = {
  collapsed?: boolean;
  toggleCollapsed?: () => void;
  contentRender: () => React.ReactNode;
  sideRender: () => React.ReactNode;
  sideWidth?: number;
  hideSide?: boolean;
};

export const SideSettingLayout = ({
  collapsed,
  toggleCollapsed,
  contentRender,
  sideRender,
  sideWidth = 300,
  hideSide = false,
}: SideSettingLayoutProps) => {
  return (
    <>
      <ToggleCollage
        collapsed={collapsed ?? false}
        width={sideWidth}
        toggleCollapsed={() => toggleCollapsed?.()}
        hidden={hideSide || collapsed === undefined}
      />
      <div className="d-flex justify-content-between">
        <motion.div
          animate={{
            width: !collapsed
              ? '100%'
              : `calc(100vw - ${sideWidth}px)`,
          }}
          className={`w-100 ${collapsed ? 'mr-4' : ''} `}
        >
          <Scrollbars
            style={{
              height: `calc(100vh - 230px)`,
            }}
            autoHide
          >
            <div>{contentRender()}</div>
          </Scrollbars>
        </motion.div>
        <motion.div
          animate={{
            width: collapsed ? sideWidth : 0,
          }}
          hidden={hideSide}
        >
          <div
            className={css`
              background-color: white;
              border-left: 1px solid #e8e8e8;
              min-height: calc(100vh - 182px);
              margin: -24px -24px -24px 0 !important;

              .collapse-inner {
                margin: 0 -24px 24px -24px;
                border-radius: 0;
                border-left: none;
                border-right: none;

                .ant-collapse-item {
                  border-radius: 0;

                  .ant-collapse-header-text {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                  }

                  .ant-collapse-content-box {
                    padding: 24px;
                  }
                }
              }
            `}
            hidden={!collapsed}
          >
            <Scrollbars
              style={{
                height: `calc(100vh - 182px)`,
                width: sideWidth,
              }}
            >
              {sideRender()}
            </Scrollbars>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SideSettingLayout;
