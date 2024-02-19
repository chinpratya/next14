import { PaperClipOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Tree,
  Divider,
  Checkbox,
  Typography,
  Empty,
  Skeleton,
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import _ from 'lodash';
import React, { useState } from 'react';

import { useSearch } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddDisclosurePurposeDestinationPersonalProtectionMeasures } from '../../api/add-disclosure-purpose-destination-personal-protection-measures';
import { useGetActivityMeta } from '../../api/get-activity-meta';

type ActivityDisclosurePurposeDestinationMeasureAddModalProps =
  {
    open: boolean;
    onClose: () => void;
    activityId: string;
    purposeId: string;
    destinationId: string;
    disbleMeasuresKey: string[];
  };

export const ActivityDisclosurePurposeDestinationMeasureAddModal =
  ({
    open,
    onClose,
    activityId,
    purposeId,
    destinationId,
    disbleMeasuresKey,
  }: ActivityDisclosurePurposeDestinationMeasureAddModalProps) => {
    const { debouncedSearch, onSearch } = useSearch();
    const { showNotification } = useNotifications();

    const { data, isLoading, isError } =
      useGetActivityMeta({
        law: true,
        search: debouncedSearch,
      });
    const addMeasures =
      useAddDisclosurePurposeDestinationPersonalProtectionMeasures(
        {
          activityId,
          purposeId,
          destinationId,
          onSuccess: () => {
            showNotification({
              type: 'success',
              message: 'Add Measure Success!',
            });
            onClose();
          },
        }
      );
    const treeData = data?.protectioninfo.map((v) => {
      return {
        title: v?.name,
        key: v?.id,
        discussion: v?.discussion,
        reference: v?.reference,
        disableCheckbox: disbleMeasuresKey.includes(
          v?.id
        ),
        children: v?.childs
          ? v?.childs.map((child) => {
              return {
                title: child?.name,
                key: child?.id,
                discussion: child?.discussion,
                reference: child?.reference,
                disableCheckbox:
                  disbleMeasuresKey.includes(child?.id),
              };
            })
          : [],
      };
    });
    const [expandedKeys, setExpandedKeys] = useState<
      React.Key[]
    >([]);
    const [checkedKeys, setCheckedKeys] = useState<
      React.Key[]
    >([]);
    const [selectedKeys, setSelectedKeys] = useState<
      React.Key[]
    >([]);
    const [selectedKeysName, setSelectedKeysName] =
      useState<Record<string, unknown>>();
    const [autoExpandParent, setAutoExpandParent] =
      useState<boolean>(true);

    const onExpand = (expandedKeysValue: React.Key[]) => {
      setExpandedKeys(expandedKeysValue);
      setAutoExpandParent(false);
    };

    const onCheck = (checked: React.Key[]) => {
      setCheckedKeys(checked);
    };

    const onSelect = (
      selectedKeysValue: React.Key[],
      info: Record<string, unknown>
    ) => {
      setSelectedKeysName(
        _.get(info, 'node', {
          title: 'รายละเอียด',
        }) as Record<string, unknown>
      );
      setSelectedKeys(selectedKeysValue);
    };
    const onChange = (e: CheckboxChangeEvent) => {
      if (e.target.checked) {
        const checked = treeData?.map((v) => v.key);
        setCheckedKeys(checked ?? []);
      } else {
        setCheckedKeys([]);
      }
    };
    const onHandleSubmit = () => {
      if (checkedKeys.length <= 0) {
        showNotification({
          type: 'error',
          message: 'กรุณาเลือกมาตราการ',
        });
      } else {
        addMeasures.submit(checkedKeys);
      }
    };

    return (
      <Modal
        title={
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.measure.add" />
        }
        open={open}
        onCancel={onClose}
        onOk={onHandleSubmit}
        width={800}
        okButtonProps={{
          loading: addMeasures.isLoading,
        }}
        afterClose={() => {
          setExpandedKeys([]);
          setCheckedKeys([]);
          setSelectedKeys([]);
          setSelectedKeysName(undefined);
        }}
      >
        <FallbackError isError={isError}>
          {!isLoading ? (
            <>
              {selectedKeys.length === 0 ? (
                <>
                  <Checkbox onChange={onChange}>
                    {checkedKeys.length}/
                    {treeData?.length}
                  </Checkbox>
                  <Divider />

                  <InputSearch
                    onSearch={onSearch}
                    className="w-100 mb-3"
                  />
                  <Tree
                    height={500}
                    checkable
                    onExpand={onExpand}
                    expandedKeys={
                      expandedKeys as string[]
                    }
                    autoExpandParent={autoExpandParent}
                    onCheck={(e) =>
                      onCheck(e as React.Key[])
                    }
                    checkedKeys={checkedKeys as string[]}
                    onSelect={onSelect}
                    selectedKeys={
                      selectedKeys as string[]
                    }
                    treeData={treeData}
                    className={css`
                      .ant-tree-title {
                        :hover {
                          color: #3364fd;
                        }
                      }
                    `}
                  />
                </>
              ) : (
                <>
                  <PageHeader
                    title={
                      (selectedKeysName?.title as string) ??
                      'รายละเอียด'
                    }
                    onBack={() => setSelectedKeys([])}
                  />
                  <Typography.Title level={3}>
                    คำสั่งควบคุม
                  </Typography.Title>
                  {_.get(
                    selectedKeysName,
                    'discussion',
                    undefined
                  ) ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: _.get(
                          selectedKeysName,
                          'discussion',
                          ''
                        ) as string,
                      }}
                    />
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                  <Typography.Title
                    level={3}
                    className="mt-2"
                  >
                    เอกสาร
                  </Typography.Title>
                  {_.get(selectedKeysName, 'reference') &&
                  _.size(
                    _.get(
                      selectedKeysName,
                      'reference',
                      []
                    ) as string[]
                  ) > 0 ? (
                    _.map(
                      _.get(
                        selectedKeysName,
                        'reference',
                        []
                      ) as string[],
                      (v, index) => (
                        <Flex
                          justifyContent="start"
                          alignItems={'start'}
                          className="mb-2"
                        >
                          <PaperClipOutlined className="mt-1 mr-1" />
                          <div
                            key={index}
                            dangerouslySetInnerHTML={{
                              __html: v,
                            }}
                          />
                        </Flex>
                      )
                    )
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <Skeleton active />
          )}
        </FallbackError>
      </Modal>
    );
  };
