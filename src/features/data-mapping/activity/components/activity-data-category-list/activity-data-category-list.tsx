import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import {
  ERROR_COLOR,
  PROCESSING_COLOR,
  CANCELED_COLOR,
} from '@/config/color';
import {
  useColumnAction,
  usePagination,
  usePermission,
  useToggle,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { TagItems } from '@components/tag-items';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  DataCategory,
  DataCategoriesPicker,
  DataCategoryListDataElement,
} from '../../../data-categories';
import { useAddDataCategoryOfActivity } from '../../api/add-data-category-of-activity';
import { useListDataCategoryOfActivity } from '../../api/list-data-catery-of-activity';
import { useRemoveDataCategoryOfActivity } from '../../api/remove-data-category-of-activity';
import {
  ActivityDataCategory,
  ActivityDataCategoryClassification,
} from '../../types';

import { ActivityDataCategoryListSources } from './activity-data-category-list-sources';

export type ActivityDataCategoryListProps = {
  activityId: string;
};

const expandedRowRender = (
  record: ActivityDataCategory
) => (
  <DataCategoryListDataElement
    dataCategoryId={record.categoryID}
  />
);

export const ActivityDataCategoryList = ({
  activityId,
}: ActivityDataCategoryListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  const columnAction =
    useColumnAction<ActivityDataCategory>({
      usages: ['delete'],
      onAction: {
        delete: (record) => toggle.remove(record),
      },
      disabled: {
        delete: !editPermission.isAllow,
      },
    });

  const { data, isLoading, isError } =
    useListDataCategoryOfActivity({
      activityId,
      page,
      pageSize,
    });

  const addDataCategoryOfActivity =
    useAddDataCategoryOfActivity({
      activityId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.dataCategories.add'
          ) as string,
        });
        toggle.create();
      },
    });
  const removeDataCategoryOfActivity =
    useRemoveDataCategoryOfActivity({
      activityId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.dataCategories.remove'
          ) as string,
        });
        toggle.remove();
      },
    });

  const columns: ColumnsType<ActivityDataCategory> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.dataCategory.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dataCategory.group" />
      ),
      dataIndex: 'groupName',
      key: 'groupName',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dataCategory.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      align: 'left',
      width: 120,
      render: (status) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dataCategory.categoryClassification" />
      ),
      dataIndex: 'categoryClassifications',
      key: 'categoryClassifications',
      width: 200,
      render: (categoryClassifications) => (
        <TagItems
          tags={categoryClassifications?.map(
            (item: ActivityDataCategoryClassification) =>
              item?.categoryClassificationID
          )}
          items={[
            {
              key: 'generalData',
              label: (
                <IntlMessage id="dataMapping.activity.dataCategory.categoryClassification.generalData" />
              ),
              color: CANCELED_COLOR,
            },
            {
              key: 'personalData',
              label: (
                <IntlMessage id="dataMapping.activity.dataCategory.categoryClassification.personalData" />
              ),
              color: PROCESSING_COLOR,
            },
            {
              key: 'sensitiveData',
              label: (
                <IntlMessage id="dataMapping.activity.dataCategory.categoryClassification.sensitiveData" />
              ),
              color: ERROR_COLOR,
            },
          ]}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dataCategory.dataSubject" />
      ),
      key: 'dataSubjects',
      width: 150,
      render: (dataSubjects: ActivityDataCategory) =>
        dataSubjects?.dataSubjects
          ?.map((v) => v.dataSubjectName)
          .join(','),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dataCategory.sourceInformation" />
      ),
      key: 'sourceInformation',
      width: 250,
      align: 'left',

      render: (
        activityDataCategory: ActivityDataCategory
      ) => (
        <ActivityDataCategoryListSources
          activityId={activityId}
          dataCategoryId={activityDataCategory.categoryID}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.dataCategory.organization" />
      ),
      dataIndex: 'organization',
      key: 'organization',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.tags" />
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
    columnAction,
  ];

  const handleAddDataCategory = (
    dataCategories: DataCategory[]
  ) => {
    const dataCategoryIds = dataCategories.map(
      (dataCategory) => dataCategory.categoryID
    );
    addDataCategoryOfActivity.submit(dataCategoryIds);
  };

  const exitingDataCategories = data?.data.map(
    (dataCategory) => dataCategory.categoryID
  );

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.dataCategory.title" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => toggle.create()}
            disabled={!editPermission.isAllow}
          >
            {' '}
            <IntlMessage id="dataMapping.activity.dataCategory.add" />
          </Button>
        }
      >
        <Table
          tableLayout="fixed"
          scroll={{
            x: 740,
          }}
          loading={isLoading}
          rowKey="categoryID"
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          expandable={{
            expandedRowRender,
          }}
        />
        <Pagination
          total={data?.totalRecord}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
      <DataCategoriesPicker
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
        okButtonProps={{
          loading: addDataCategoryOfActivity.isLoading,
        }}
        onFinish={handleAddDataCategory}
        exitingDataCategories={exitingDataCategories}
      />
      <DeleteModal
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        identifier={toggle.data?.name}
        onDelete={() =>
          removeDataCategoryOfActivity.submit(
            toggle.data?.categoryID
          )
        }
        okButtonProps={{
          loading: removeDataCategoryOfActivity.isLoading,
        }}
      />
    </FallbackError>
  );
};
