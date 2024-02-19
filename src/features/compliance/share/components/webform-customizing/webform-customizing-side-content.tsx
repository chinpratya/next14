import { Typography } from 'antd';
import type { TreeProps } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { fieldsInfo } from '@/config/fields';
import { Flex } from '@components/flex';
import { TreeInnerAppLayout } from '@components/tree-inner-app-layout';

import { useAssessmentAutomationStore } from '../../stores';
import { WebformBuilderItem } from '../../types/webform-builder';

export const WebformCustomizingSideContent = () => {
  const { selectedFormKey, formItems, onSelectedForm } =
    useAssessmentAutomationStore();
  const renderTreeData = (
    webformCustomizingItems: WebformBuilderItem[],
    parentKey?: string
  ): TreeProps['treeData'] =>
    webformCustomizingItems.map((item) => ({
      title: (
        <Flex
          justifyContent="between"
          alignItems="center"
          className="w-100"
        >
          <Typography.Text
            style={{
              width: parentKey ? 197 : 222,
            }}
          >
            <span className="text-uppercase">
              {item.alias}
            </span>
            :{item.title}
          </Typography.Text>
        </Flex>
      ),
      key: item.key,
      icon: fieldsInfo[item.widget].icon,
      children: item?.children
        ? renderTreeData(item.children, item.key)
        : undefined,
    }));

  return (
    <>
      <div className="w-100">
        <Scrollbars
          style={{
            height: 'calc(100vh - 180px)',
          }}
          autoHide
        >
          <TreeInnerAppLayout
            selectedKeys={[selectedFormKey]}
            treeData={renderTreeData(formItems)}
            defaultExpandedKeys={formItems.map(
              (item) => item.key
            )}
            onSelect={(selectKeys) => {
              selectKeys?.length > 0 &&
                onSelectedForm(selectKeys[0] as string);
            }}
          />
        </Scrollbars>
      </div>
    </>
  );
};
