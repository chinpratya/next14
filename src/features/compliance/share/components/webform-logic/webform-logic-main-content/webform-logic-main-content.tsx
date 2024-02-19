import { css } from '@emotion/css';
import { useToggle } from '@mantine/hooks';
import { Card, Empty } from 'antd';

import { SideSettingLayout } from '@/layouts';

import { useAaWebform } from '../../../hooks/use-aa-webform';
import { useAaWebformLogic } from '../../../hooks/use-aa-webform-logic';
import { useAaWebformLogicStore } from '../../../stores/use-aa-webform-logic-store';
import { useAaWebformStore } from '../../../stores/use-aa-webform-store';
// eslint-disable-next-line import/no-cycle
import { WebformBuilder } from '../../webform-builder';

import { WebformLogicMainSetting } from './webform-logic-main-setting';

export const WebformLogicMainContent = () => {
  const [collapsed, toggleCollapsed] = useToggle();
  const { webformBuilderItems } = useAaWebformStore();
  const { selectedLogicKey } = useAaWebformLogicStore();
  const { logicWebformItems } = useAaWebformLogic({
    webformBuilderItems,
  });

  const { getAllWebformBuilderItemsWithChildren } =
    useAaWebform({
      webformBuilderItems,
    });

  const selectedLogicItem =
    getAllWebformBuilderItemsWithChildren(
      logicWebformItems
    )?.find((item) => item.key === selectedLogicKey);

  return (
    <SideSettingLayout
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
      sideRender={() => (
        <WebformLogicMainSetting
          selectedLogicItem={selectedLogicItem}
          onToggleLogic={toggleCollapsed}
          fields={getAllWebformBuilderItemsWithChildren(
            webformBuilderItems
          )}
        />
      )}
      contentRender={() => (
        <Card
          className={css`
            margin-bottom: 0;

            .ant-card-body {
              padding: 48px 48px 24px 96px;
              min-height: calc(100vh - 230px);
            }
          `}
        >
          {selectedLogicKey ? (
            <WebformBuilder />
          ) : (
            <Empty
              className="mb-4"
              style={{ marginLeft: -74 }}
            />
          )}
        </Card>
      )}
      sideWidth={450}
    />
  );
};
