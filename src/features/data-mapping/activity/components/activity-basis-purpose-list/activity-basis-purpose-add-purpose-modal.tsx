import { css } from '@emotion/css';
import {
  Table,
  Tag,
  Typography,
  Cascader,
  Steps,
  Row,
  Col,
  Divider,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  usePagination,
  useSearch,
  useRowSelection,
  useFilter,
} from '@/hooks';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListPurpose } from '../../../purpose/api/list-purpose';
import { Purpose } from '../../../purpose/types';
import { useListTags } from '../../../tags/api/list-tags';
import { useAddActivityBasisPurposeDataCategory } from '../../api/add-activity-basis-purpose-data-category';

import { ActivityDasisPurposeAddDataCategory } from './activity-basis-purpose-add-data-category';

type ActivityBasisPurposeAddPurposeModalProps = {
  open: boolean;
  onClose: () => void;
  onFinish?: (dataPurposePicker: Purpose[]) => void;
  loading: boolean;
  existingDataPurposeId?: string[];
  activityId: string;
  current: number;
  basisId: string;
  setCurrent: (current: number) => void;
};

type CategariesType = {
  dataCategoryID: string;
  elements: string[];
};

export const ActivityBasisPurposeAddPurposeModal = ({
  open,
  onClose,
  onFinish,
  loading,
  existingDataPurposeId,
  activityId,
  current,
  setCurrent,
  basisId,
}: ActivityBasisPurposeAddPurposeModalProps) => {
  const { t } = useTranslation();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { onSearch, debouncedSearch } = useSearch();
  const { showNotification } = useNotifications();
  const [tagID, setTagID] = useState<string>();
  const [categaries, setCategaries] =
    useState<CategariesType[]>();
  const { filters, columnFilter, filterDropdown } =
    useFilter<Purpose>();
  const listTag = useListTags({});
  const { data, isLoading, isError } = useListPurpose({
    search: debouncedSearch,
    page,
    pageSize,
    status: 'active',
    tagID,
    ...filters,
  });

  const optionsTag = listTag.data?.data.map((value) => {
    return {
      label: value.name,
      value: value.tagID,
    };
  });

  const setPayloadCategory = (
    dataCategory: CategariesType[]
  ) => {
    setCategaries(dataCategory);
  };

  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      type: 'radio',
      disabledRowKeys: existingDataPurposeId,
      disabledKey: 'purposeID',
    });

  const addBasisPurposeDataCategory =
    useAddActivityBasisPurposeDataCategory({
      activityId,
      basisId,
      purposeId: rowSelection?.selectedRowKeys[0] ?? '',
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.dataCategories.add'
          ) as string,
        });
        onClose();
      },
    });

  const statusItems = [
    {
      label: tokens.common.status.active,
      key: 'active',
      color: '#04D182',
    },
    {
      label: tokens.common.status.inactive,
      key: 'inactive',
      color: '#FF4B4B',
    },
  ];

  const columns: ColumnsType<Purpose> = [
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.group" />
      ),
      key: 'group ',
      dataIndex: 'group',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.status" />
      ),
      key: 'status',
      dataIndex: 'status',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus
          status={status}
          items={statusItems}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.version" />
      ),
      key: 'version',
      dataIndex: 'version',
      width: 100,
      render: (version: string) => `V.${version}`,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.tags" />
      ),
      dataIndex: 'tagName',
      key: 'tagName',
      align: 'left',
      width: 150,
      ...columnFilter('filter'),
      filters: listTag.data?.data?.map((value) => ({
        text: value.name,
        value: value.tagID,
      })),
      filterDropdown: filterDropdown('tagID'),
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
  ];
  const handleOk = () => {
    const selectedRowKeys: string[] =
      rowSelection.selectedRowKeys ?? [];
    const selectedDataPurpose = data?.data.filter(
      (item) => selectedRowKeys.includes(item.purposeID)
    );
    switch (current) {
      case 0:
        if (
          selectedDataPurpose &&
          selectedDataPurpose?.length <= 0
        ) {
          showNotification({
            type: 'error',
            message: t(
              'dataMapping.notification.activity.basis.purpose.add.error'
            ) as string,
          });
        } else {
          onFinish?.(selectedDataPurpose ?? []);
        }

        break;
      case 1:
        const emptyID = categaries?.map((entry) => {
          const isEmptyOrUndefined =
            _.isEmpty(entry.elements) ||
            _.isUndefined(entry.elements);

          if (isEmptyOrUndefined) {
            return true;
          }
          return false;
        });
        if (emptyID && emptyID?.includes(true)) {
          showNotification({
            type: 'error',
            message: t(
              'dataMapping.notification.activity.basis.dataElement.add.error'
            ) as string,
          });
        } else {
          addBasisPurposeDataCategory.submit({
            categories: categaries,
          });
        }

        break;
      default:
        break;
    }
  };

  const onChange = (value: string[][]) => {
    const ate = value.map((item) => item[0]);
    setTagID(ate.join(','));
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.purposePicker.title" />
      }
      open={open}
      onCancel={onClose}
      width={1000}
      onOk={handleOk}
      okButtonProps={{
        loading:
          loading ||
          addBasisPurposeDataCategory.isLoading,
      }}
      afterClose={() => {
        resetSelectedRowKeys();
        setCurrent(0);
      }}
      okText={
        current === 0 ? (
          <IntlMessage id="dataMapping.activity.next" />
        ) : (
          <IntlMessage id="dataMapping.activity.ok" />
        )
      }
    >
      <Row
        justify="center"
        align="middle"
        className="my-3"
      >
        <Col className="w-50">
          <Steps
            current={current}
            items={[
              {
                title: (
                  <IntlMessage id="dataMapping.activity.lawfulBasis.basis.purpose" />
                ),
              },
              {
                title: (
                  <IntlMessage id="dataMapping.activity.lawfulBasis.basis.dataCategories" />
                ),
              },
            ]}
          />
        </Col>
      </Row>
      <Divider />
      {current !== 0 ? (
        <ActivityDasisPurposeAddDataCategory
          activityId={activityId}
          setPayloadCategory={setPayloadCategory}
        />
      ) : (
        <FallbackError isError={isError}>
          <Flex justifyContent="end">
            <Flex
              justifyContent="between"
              alignItems="center"
              className={css`
                width: 400px;
                margin-bottom: 15px;
              `}
            >
              <Typography.Text>
                <IntlMessage id="dataMapping.activity.activityDetail.tags" />{' '}
                :
              </Typography.Text>
              <Cascader
                dropdownMenuColumnStyle={{
                  width: '300px',
                }}
                className={css`
                  width: 78%;
                  margin: 0 5px;
                `}
                options={optionsTag}
                onChange={(e) =>
                  onChange(e as string[][])
                }
                multiple
                maxTagCount={'responsive'}
                showSearch
              />
            </Flex>
            <InputSearch
              onSearch={onSearch}
              className="mb-3"
            />
          </Flex>
          <Table
            loading={isLoading}
            columns={columns}
            scroll={{ x: 1000 }}
            tableLayout="fixed"
            dataSource={data?.data ?? []}
            pagination={false}
            rowKey="purposeID"
            rowSelection={rowSelection}
          />
          <Pagination
            current={page}
            total={10}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </FallbackError>
      )}
    </Modal>
  );
};
