import { css } from '@emotion/css';
import { Tooltip, TreeProps, Badge } from 'antd';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { fieldsInfo } from '@/config/fields';
import { TreeInnerAppLayout } from '@components/tree-inner-app-layout';

import {
  WebformBuilderItem,
  useAssessmentAutomationStore,
} from '../../../../share';
import { useListAssessmentFormCommentUnReads } from '../../../api/list-assessment-form-comment-unread';

import { FormProgressMenu } from './form-progress-menu';

type FormProgressprops = {
  assessmentId: string;
};
export const FormProgress = ({
  assessmentId,
}: FormProgressprops) => {
  const {
    formItems,
    selectedFormKey,
    formItemsKey,
    onSelectedForm,
  } = useAssessmentAutomationStore();
  const { data } = useListAssessmentFormCommentUnReads({
    assessmentId,
  });

  const [expandedKeys, setExpandedKeys] = useState<
    string[]
  >([]);
  const getFieldsValues = (): Record<string, unknown> => {
    const fieldsValues: Record<string, unknown> = {};
    formItems.forEach((item) => {
      fieldsValues[item.key] = item.value;
      item?.children?.forEach((child) => {
        fieldsValues[child.key] = child.value;
      });
    });
    return fieldsValues;
  };

  const fieldsValues = getFieldsValues();

  const checkComment = (
    webformBuilderItem: WebformBuilderItem
  ) => {
    const findId = _.find(
      data,
      (value) => value === webformBuilderItem.key
    );

    const checkChildComment =
      webformBuilderItem?.children?.map(
        (child): boolean => {
          const hasComment = _.find(
            data,
            (value) => value === child.key
          );

          return hasComment !== undefined;
        }
      );

    return (
      findId !== undefined ||
      checkChildComment?.includes(true)
    );
  };

  const renderTreeData = (
    webformCustomizingItems: WebformBuilderItem[]
  ): TreeProps['treeData'] =>
    webformCustomizingItems.map((item) => ({
      title: (
        <FormProgressMenu
          fieldsValues={fieldsValues}
          field={item}
          currentFieldKey={selectedFormKey}
          formItems={formItems}
          disabled={!formItemsKey.includes(item.key)}
          formItemsKeys={formItemsKey}
        />
      ),
      key: item.key,
      disabled: !formItemsKey.includes(item.key),
      icon: (
        <Tooltip title={fieldsInfo[item.widget]?.title}>
          <Badge dot={checkComment(item)}>
            {fieldsInfo[item.widget]?.icon}
          </Badge>
        </Tooltip>
      ),
      children: item?.children
        ? renderTreeData(item.children)
        : undefined,
    }));

  const getSelectedKeys = useCallback(
    (
      formItems: WebformBuilderItem[]
    ): string[] | undefined => {
      const selectedKeys: string[] = [];
      formItems.forEach((item) => {
        const activeChild = item?.children?.find(
          (child) => child.key === selectedFormKey
        );
        if (activeChild) {
          selectedKeys.push(activeChild.key);
        }
        if (item.key === selectedFormKey || activeChild) {
          selectedKeys.push(item.key);
        }
      });
      return selectedKeys;
    },
    [selectedFormKey]
  );

  useEffect(() => {
    const defaultExpandedKeys =
      formItems
        ?.filter(
          (item) =>
            item?.children?.find(
              (child) => child.key === selectedFormKey
            ) || item.key === selectedFormKey
        )
        .map((item) => item.key) || [];
    setExpandedKeys(
      (keys) =>
        _.uniq([
          ...keys,
          ...defaultExpandedKeys,
        ]) as string[]
    );
  }, [formItems, selectedFormKey]);

  return (
    <div
      className={css`
        .ant-tree .ant-tree-node-content-wrapper {
          padding: 0;
        }
      `}
    >
      <TreeInnerAppLayout
        selectedKeys={getSelectedKeys(formItems)}
        treeData={renderTreeData(formItems)}
        expandedKeys={expandedKeys}
        onExpand={(keys) =>
          setExpandedKeys(keys as string[])
        }
        onSelect={([key]) =>
          key && onSelectedForm?.(key.toString())
        }
      />
    </div>
  );
};
