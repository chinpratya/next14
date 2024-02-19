import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import {
  CANCELED_COLOR,
  ERROR_COLOR,
  PROCESSING_COLOR,
} from '@/config/color';
import {
  usePagination,
  useToggle,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteDataElementOfDataCategories } from '../../api/delete-data-element-of-data-categories';
import { useListDataElementOfDataCategories } from '../../api/list-data-element-of-data-categories';
import { DataElementOfCategories } from '../../types';

import { DataCategoriesElementListSelectModal } from './data-categories-element-list-select-modal';

type DataElementsDataCategoryDataElementsList = {
  dataCategoryID: string;
};

export const DataCategoriesElementList = ({
  dataCategoryID,
}: DataElementsDataCategoryDataElementsList) => {
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
      permissions['pdpakit:datamap:categories:update'],
    ],
  });

  const { data, isLoading, isError } =
    useListDataElementOfDataCategories({
      dataCategoryID,
      page,
      pageSize,
    });

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'dataMapping.notification.dataCategories.dataElement.delete'
      ) as string,
    });
    toggle.remove();
  };

  const deleteDataElement =
    useDeleteDataElementOfDataCategories({
      dataCategoryID,
      onSuccess,
    });

  const columns: ColumnsType<DataElementOfCategories> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.detail.dataElement.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.detail.dataElement.table.dataClassification" />
      ),
      dataIndex: 'dataClassificationID',
      key: 'dataClassificationID',
      width: 150,
      render: (dataClassification) => (
        <div style={{ width: '120px' }}>
          <ShowTagStatus
            key={dataClassification}
            status={dataClassification}
            items={[
              {
                key: 'general-data',
                label:
                  'dataMapping.dataCategoryPicker.dataClassifications.generalData',
                color: CANCELED_COLOR,
              },
              {
                key: 'personal-data',
                label:
                  'dataMapping.dataCategoryPicker.dataClassifications.personalData',
                color: PROCESSING_COLOR,
              },
              {
                key: 'sensitive-data',
                label:
                  'dataMapping.dataCategoryPicker.dataClassifications.sensitiveData',
                color: ERROR_COLOR,
              },
            ]}
          />
        </div>
      ),
    },
    {
      key: 'delete',
      align: 'center',
      width: 50,
      render: (DataElement: DataElementOfCategories) => (
        <Typography.Text
          className={css`
            cursor: pointer;
          `}
          onClick={() => toggle.remove(DataElement)}
          disabled={!editPermission.isAllow}
        >
          <DeleteOutlined />{' '}
          {
            <IntlMessage id="dataMapping.dataCategories.detail.dataElement.table.remove" />
          }
        </Typography.Text>
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.dataCategories.detail.dataElement.title" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined className="mr-1" />}
            onClick={() => toggle.edit()}
            disabled={!editPermission.isAllow}
          >
            {
              <IntlMessage id="dataMapping.dataCategories.detail.dataElement.add" />
            }
          </Button>
        }
      >
        <Table
          tableLayout="fixed"
          scroll={{
            x: 800,
          }}
          rowKey="dataElementID"
          loading={isLoading}
          columns={columns}
          dataSource={data?.data ?? []}
          pagination={false}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalRecord}
          onChange={onPaginationChange}
        />
        <DataCategoriesElementListSelectModal
          open={toggle.openEdit}
          onClose={() => toggle.edit()}
          dataCategoryID={dataCategoryID}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          identifier={toggle?.data?.name}
          onDelete={() => {
            deleteDataElement.submit({
              dataElementID: toggle.data?.dataElementID,
              dataCategoryID,
            });
          }}
          okButtonProps={{
            loading: deleteDataElement.isLoading,
          }}
        />
      </Card>
    </FallbackError>
  );
};
