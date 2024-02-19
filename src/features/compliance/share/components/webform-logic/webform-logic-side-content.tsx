import { Typography } from 'antd';
import type { TreeProps } from 'antd';
import type { Key } from 'rc-tree/lib/interface';
import { useEffect } from 'react';

import { fieldsInfo } from '@/config/fields';
import { Flex } from '@components/flex';
import { TreeInnerAppLayout } from '@components/tree-inner-app-layout';

import { useAaWebformLogic } from '../../hooks/use-aa-webform-logic';
import { useAaWebformLogicStore } from '../../stores/use-aa-webform-logic-store';
import { useAaWebformStore } from '../../stores/use-aa-webform-store';
import { WebformBuilderItem } from '../../types/webform-builder';

const renderedSideContent = (
  webformCustomizingItems?: WebformBuilderItem[],
  parentKey?: string
): TreeProps['treeData'] =>
  webformCustomizingItems?.map((item) => ({
    title: (
      <Flex
        justifyContent="between"
        alignItems="center"
        className="w-100"
      >
        <Typography.Text
          style={{
            width: parentKey ? 199 : 222,
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
    children: renderedSideContent(
      item.children,
      item.key
    ),
  }));
export const WebformLogicSideContent = () => {
  const { webformBuilderItems } = useAaWebformStore();
  const { selectedLogicKey, onSelectedLogicKey } =
    useAaWebformLogicStore();
  const { logicWebformItems } = useAaWebformLogic({
    webformBuilderItems,
  });

  const onSelectLogicKey = (selectedKeys?: Key[]) => {
    if (selectedKeys?.length) {
      const selectedLogicKey = selectedKeys[
        selectedKeys?.length - 1
      ] as string;
      if (!selectedLogicKey)
        throw new Error('LogicKey not found');
      onSelectedLogicKey?.(selectedLogicKey);
    }
  };

  useEffect(() => {
    if (!selectedLogicKey && logicWebformItems.length) {
      onSelectedLogicKey?.(logicWebformItems[0].key);
    }
  }, [
    logicWebformItems,
    onSelectedLogicKey,
    selectedLogicKey,
  ]);

  return (
    <>
      <TreeInnerAppLayout
        selectedKeys={[selectedLogicKey ?? '']}
        onSelect={onSelectLogicKey}
        treeData={renderedSideContent(logicWebformItems)}
      />
    </>
  );
};
