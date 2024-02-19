import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import {
  CANCELED_COLOR,
  ERROR_COLOR,
  PROCESSING_COLOR,
} from '@/config/color';
import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { DataElementOfCategories } from '../../../data-categories';
import { useAddActivityBasisPurposeDataCategory } from '../../api/add-activity-basis-purpose-data-category';
import { useListActivityBasisPurposeDataCategory } from '../../api/list-activity-basis-purpose-data-category';
import { useRemoveActivityBasisPurposeDataCategory } from '../../api/remove-activity-basis-purpose-data-category';
import {
  // ActivityDataCategory,
  exitingDataElementType,
} from '../../types';
import { ActivityBasisPurposeDataCategory } from '../../types';

import { ActivityBasisPurposeAddDataCategoryModal } from './activity-basis-purpose-add-data-category-modal';

type ActivityBasisPurposeDataCategoryListProps = {
  activityId: string;
  basisId: string;
  purposeId: string;
};
type onAddBasisPurposeDataCategoryProps = {
  data: Record<string, DataElementOfCategories[]>;
};

export const ActivityBasisPurposeDataCategoryList = ({
  activityId,
  basisId,
  purposeId,
}: ActivityBasisPurposeDataCategoryListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useListActivityBasisPurposeDataCategory({
      activityId,
      basisId,
      purposeId,
      pageSize: 9999,
    });
  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  const addBasisPurposeDataCategory =
    useAddActivityBasisPurposeDataCategory({
      activityId,
      basisId,
      purposeId,
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

  const onAddBasisPurposeDataCategory = ({
    data,
  }: onAddBasisPurposeDataCategoryProps) => {
    const categories = Object.entries(data).map(
      ([dataCategoryID, elements]) => ({
        dataCategoryID,
        elements: elements.map(
          (element) => element.dataElementID
        ),
      })
    );
    const hasEmptyArray = _.values(data).some(
      (arr) => arr.length === 0
    );

    if (hasEmptyArray || categories.length === 0) {
      showNotification({
        type: 'error',
        message: 'Please select Data Element!',
      });
    } else {
      addBasisPurposeDataCategory.submit({
        categories,
      });
    }
  };

  const exitingDataCategories = data?.data.map(
    (dataCategory) => dataCategory.dataCategoryID
  );

  const exitingDataElement = data?.data.map(
    (dataCategory) => {
      return {
        dataElements: dataCategory.dataElements.map(
          (v) => v.dataElementID
        ),
        dataCategoryID: dataCategory.dataCategoryID,
      };
    }
  );

  const removeBasisPurposeDataCategory =
    useRemoveActivityBasisPurposeDataCategory({
      activityId,
      basisId,
      purposeId,
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

  const columns: ColumnsType<ActivityBasisPurposeDataCategory> =
    [
      {
        title: (
          <IntlMessage id="dataMapping.activity.lawfulBasis.basis.dataCategory" />
        ),
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.lawfulBasis.basis.dataElement" />
        ),
        dataIndex: 'dataElements',
        key: 'dataElements',
        width: 150,
        render: (
          dataElements: ActivityBasisPurposeDataCategory[]
        ) => (
          <>
            {dataElements?.map((dataElement, index) => (
              <div key={index}>
                <span>{dataElement.name}</span>
              </div>
            ))}
          </>
        ),
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.lawfulBasis.basis.dataClassification" />
        ),
        key: 'dataClassification',
        width: 150,
        render: (
          dataClassification: ActivityBasisPurposeDataCategory
        ) => (
          <>
            {dataClassification?.dataElements.map(
              (data, index) => {
                return (
                  <div key={index} className="mb-1">
                    <ShowTagStatus
                      status={data.classificationID}
                      items={[
                        {
                          label:
                            'dataMapping.dataCategoryPicker.dataClassifications.generalData',
                          key: 'general-data',
                          color: CANCELED_COLOR,
                        },
                        {
                          label:
                            'dataMapping.dataCategoryPicker.dataClassifications.personalData',
                          key: 'personal-data',
                          color: PROCESSING_COLOR,
                        },
                        {
                          label:
                            'dataMapping.dataCategoryPicker.dataClassifications.sensitiveData',
                          key: 'sensitive-data',
                          color: ERROR_COLOR,
                        },
                      ]}
                    />
                  </div>
                );
              }
            )}
          </>
        ),
      },
      {
        key: 'action',
        width: 50,
        align: 'center',
        render: (
          dataCategory: ActivityBasisPurposeDataCategory
        ) => (
          <DropdownTable
            items={[
              {
                key: 'edit',
                label: 'แก้ไขชุดข้อมูล',
                icon: <EditOutlined />,
                onClick: () => toggle.create(),
                disabled: !editPermission.isAllow,
              },
              {
                key: 'delete',
                label: 'นำออก',
                icon: <DeleteOutlined />,
                onClick: () =>
                  toggle.remove(dataCategory),
                disabled: !editPermission.isAllow,
              },
            ]}
          />
        ),
      },
    ];

  return (
    <FallbackError isError={isError}>
      {data && data?.data?.length <= 0 ? (
        <Flex justifyContent={'end'}>
          <Button
            type="link"
            onClick={() => toggle.create()}
          >
            เพิ่มชุดข้อมูล
          </Button>
        </Flex>
      ) : null}
      <Table
        tableLayout="fixed"
        scroll={{
          x: 800,
        }}
        rowKey="dataCategoryID"
        loading={isLoading}
        columns={columns}
        dataSource={data?.data ?? []}
        pagination={false}
      />
      <ActivityBasisPurposeAddDataCategoryModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
        okButtonProps={{
          loading: addBasisPurposeDataCategory.isLoading,
        }}
        isLoadingAdd={
          addBasisPurposeDataCategory.isLoading
        }
        onFinish={onAddBasisPurposeDataCategory}
        exitingDataCategories={exitingDataCategories}
        exitingDataElement={
          (exitingDataElement as exitingDataElementType[]) ??
          []
        }
        activityId={activityId}
      />

      <DeleteModal
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        identifier={toggle.data?.name}
        onDelete={() =>
          removeBasisPurposeDataCategory.submit(
            toggle.data?.dataCategoryID
          )
        }
        okButtonProps={{
          loading:
            removeBasisPurposeDataCategory.isLoading,
        }}
      />
    </FallbackError>
  );
};
