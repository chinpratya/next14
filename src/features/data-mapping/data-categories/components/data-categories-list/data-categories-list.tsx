import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Card,
  Table,
  Typography,
  Tag,
  Cascader,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import {
  CANCELED_COLOR,
  ERROR_COLOR,
  PROCESSING_COLOR,
  SUCCESS_COLOR,
} from '@/config/color';
import {
  usePagination,
  useSearch,
  useColumnFiltered,
  useToggle,
  usePermission,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListTags } from '../../../tags/api/list-tags';
import { useDeleteDataCategories } from '../../api/delete-data-categories';
import { useListDataCategories } from '../../api/list-data-categories';
import { DataCategory } from '../../types';

type DataCategoriesListProps = {
  onEdit?: (categories: DataCategory) => void;
};

export const DataCategoriesList = ({
  onEdit,
}: DataCategoriesListProps) => {
  const toggle = useToggle();
  const { showNotification } = useNotifications();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const [tagID, setTagID] = useState<string>();

  const deletePermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:categories:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:categories:update'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:categories:read'],
    ],
  });

  const listTag = useListTags({});
  const { data, isLoading, isError } =
    useListDataCategories({
      search: debouncedSearch,
      page,
      pageSize,
      tagID,
    });
  const optionsTag = listTag.data?.data.map((value) => {
    return {
      label: value.name,
      value: value.tagID,
    };
  });

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: 'Delete Data Categories Success',
    });
    toggle.remove();
  };

  const deleteCategory = useDeleteDataCategories({
    onSuccess,
  });

  const columns: ColumnsType<DataCategory> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.Id" />
      ),
      dataIndex: 'categoryID',
      key: 'categoryID',
      width: 100,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.name" />
      ),
      key: 'name',
      width: 200,
      ellipsis: true,
      render: (categories: DataCategory) => (
        <Typography.Link
          onClick={() => onEdit?.(categories)}
          disabled={!readPermission.isAllow}
        >
          {categories.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.group" />
      ),
      dataIndex: 'groupName',
      key: 'groupName',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'ใช้งาน',
          value: 'active',
        },
        {
          text: 'ไม่ใช้งาน',
          value: 'inactive',
        },
      ],
      onFilter: (value, record) =>
        record.status === value,
      width: 100,
      render: (status) => (
        <div style={{ width: '100px' }}>
          <ShowTagStatus
            items={[
              {
                key: 'active',
                label: tokens.common.status.active,
                color: SUCCESS_COLOR,
              },
              {
                key: 'inactive',
                label: tokens.common.status.inactive,
                color: CANCELED_COLOR,
              },
            ]}
            status={status}
          />
        </div>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.categoriesClassification" />
      ),
      key: 'categoryClassification',
      width: 150,
      align: 'left',
      filters: [
        {
          text: 'ข้อมูลทั่วไป',
          value: 'generalData',
        },
        {
          text: 'ข้อมูลส่วนบุคคล',
          value: 'personalData',
        },
        {
          text: 'ข้อมูลอ่อนไหว',
          value: 'sensitiveData',
        },
      ],
      onFilter: (value, record) =>
        record.categoryClassifications.some(
          (item) =>
            item.categoryClassificationID === value
        ),
      render: (dataCategories: DataCategory) => {
        return dataCategories.categoryClassifications
          .length > 0
          ? dataCategories.categoryClassifications.map(
              (classification) => (
                <div
                  className={css`
                    .ant-tag {
                      width: 120px;
                      margin: 5px 0;
                    }
                  `}
                  key={
                    dataCategories.categoryID +
                    classification.categoryClassificationID
                  }
                >
                  <ShowTagStatus
                    key={
                      classification.categoryClassificationID
                    }
                    status={
                      classification.categoryClassificationID
                    }
                    items={[
                      {
                        key: 'generalData',
                        label:
                          'dataMapping.activity.dataCategory.categoryClassification.generalData',
                        color: CANCELED_COLOR,
                      },
                      {
                        key: 'personalData',
                        label:
                          'dataMapping.activity.dataCategory.categoryClassification.personalData',
                        color: PROCESSING_COLOR,
                      },
                      {
                        key: 'sensitiveData',
                        label:
                          'dataMapping.activity.dataCategory.categoryClassification.sensitiveData',
                        color: ERROR_COLOR,
                      },
                    ]}
                  />
                </div>
              )
            )
          : '-';
      },
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.organization" />
      ),
      dataIndex: 'organization',
      key: 'organization',
      align: 'left',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.createdDt" />
      ),
      dataIndex: 'created_dt',
      key: 'created_dt',
      width: 180,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.updatedDt" />
      ),
      dataIndex: 'updated_dt',
      key: 'updated_dt',
      width: 180,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.tags" />
      ),
      dataIndex: 'tagName',
      key: 'tagName',
      align: 'left',
      width: 200,
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (categories: DataCategory) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.dataCategories.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => onEdit?.(categories),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id="dataMapping.dataCategories.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => toggle?.remove(categories),
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer, xScroll } =
    useColumnFiltered({
      columns,
    });

  const onChange = (value: string[][]) => {
    const ate = value.map((item) => item[0]);
    setTagID(ate.join(','));
  };
  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <Flex justifyContent="end">
            <Flex
              justifyContent={'between'}
              alignItems="center"
              className={css`
                width: 400px;
              `}
            >
              <Typography.Text>
                <IntlMessage id="dataMapping.dataCategories.tags" />{' '}
                :
              </Typography.Text>
              <Cascader
                className={css`
                  width: 78% !important;
                  margin: 0 5px;
                `}
                dropdownMenuColumnStyle={{
                  width: '300px',
                }}
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
              className="mr-2"
            />
            {ColumnTransfer}
          </Flex>
        }
      >
        <Table
          tableLayout="fixed"
          scroll={{
            x: xScroll,
          }}
          rowKey="categoryID"
          columns={filteredColumns}
          loading={isLoading}
          dataSource={data?.data ?? []}
          pagination={false}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          onDelete={() => {
            deleteCategory.submit({
              dataCategoryID: toggle?.data?.categoryID,
            });
          }}
          okButtonProps={{
            loading: deleteCategory.isLoading,
          }}
        />
      </Card>
    </FallbackError>
  );
};
