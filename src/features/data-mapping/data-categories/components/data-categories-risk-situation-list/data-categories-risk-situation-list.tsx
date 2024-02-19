import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import {
  usePagination,
  useToggle,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteDataCategoriesAssessent } from '../../api/delete-data-categories-assessment';
import { useListDataCategoriesAssessment } from '../../api/list-data-categories-assessment';
import { DataCategoriesAssessment } from '../../types';

import { DataCategoriesRiskSituationListAddModal } from './data-categories-risk-situation-list-add-modal';

type DataCategoriesRiskSituationListProps = {
  open: boolean;
  onClose: () => void;
  dataCategoriesId: string;
};

export const DataCategoriesRiskSituationList = ({
  open,
  onClose,
  dataCategoriesId,
}: DataCategoriesRiskSituationListProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

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

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } =
    useListDataCategoriesAssessment({
      dataCategoryID: dataCategoriesId,
      page,
      pageSize,
    });

  const deleteAssessment =
    useDeleteDataCategoriesAssessent({
      dataCategoriesId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.dataCategories.riskAssessment.delete'
          ) as string,
        });
        toggle.remove();
      },
    });

  const columns: ColumnsType<DataCategoriesAssessment> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.riskAssessment.name" />
      ),
      render: (assesment: DataCategoriesAssessment) => (
        <Typography.Link
          onClick={() =>
            router.push(
              `${router.asPath}/${assesment.ObjectUUID}`
            )
          }
        >
          {assesment.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.riskAssessment.dataSubject" />
      ),
      dataIndex: 'dataSubject',
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.riskAssessment.assessmentLevelName" />
      ),
      dataIndex: 'assessmentLavelName',
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.riskAssessment.isAssessment" />
      ),
      dataIndex: 'isAssessment',
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (categories) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.dataCategories.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () =>
                router.push(
                  `${router.asPath}/${categories.ObjectUUID}`
                ),
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
  return (
    <FallbackError isError={isError}>
      <Table
        columns={columns}
        dataSource={data?.data ?? []}
        pagination={false}
        loading={isLoading}
      />
      <Pagination
        current={page}
        total={data?.totalRecord}
        pageSize={pageSize}
        onChange={onPaginationChange}
      />
      <DataCategoriesRiskSituationListAddModal
        open={open}
        onClose={onClose}
        dataCategoriesId={dataCategoriesId}
      />
      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle.data?.name as string}
        loading={deleteAssessment.isLoading}
        data={toggle.data}
        onCancel={() => toggle.remove()}
        onDelete={(data) =>
          deleteAssessment.submit(
            data?.ObjectUUID as string
          )
        }
      />
    </FallbackError>
  );
};
