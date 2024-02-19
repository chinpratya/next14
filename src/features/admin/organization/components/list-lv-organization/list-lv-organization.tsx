import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  useColumnFiltered,
  useSearch,
  useToggle,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteOrganizationLv } from '../../api/delete-organization-lv';
import { useListOrganizationLv } from '../../api/list-organization-lv';
import { OrganizationLevel } from '../../types';

import { CreateLvOrganizationModal } from './create-lv-organization-modal';

export type ListLvOrganizationProps = {
  onEdit?: (level: OrganizationLevel) => void;
};

export const ListLvOrganization = ({
  onEdit,
}: ListLvOrganizationProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const toggle = useToggle<OrganizationLevel>();

  const columns: ColumnsType<OrganizationLevel> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.label" />
      ),
      key: 'label_th',
      dataIndex: 'label_th',
      width: 300,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.lvOrganization" />
      ),
      key: 'lvOrganization',
      dataIndex: 'level',
      align: 'center',
      width: 150,
      render: (level: number) => (
        <span>{`Lv.${level}`}</span>
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.type" />
      ),
      key: 'type',
      dataIndex: 'type',
      align: 'center',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.createdDt" />
      ),
      key: 'created_dt',
      dataIndex: 'created_dt',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.createdBy" />
      ),
      key: 'created_by',
      dataIndex: 'created_by',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.updatedDt" />
      ),
      key: 'updated_dt',
      dataIndex: 'updated_dt',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      width: 100,
      render: (level: OrganizationLevel) => {
        const isHasChild =
          _.get(level, 'child', []).length > 0;
        return (
          <Flex justifyContent="start">
            <PlusCircleOutlined
              onClick={() => toggle.duplicate(level)}
              className="cursor-pointer mr-2"
              hidden={isHasChild}
            />
            <EditOutlined
              onClick={() => onEdit?.(level)}
              className="cursor-pointer mr-2"
            />
            <DeleteOutlined
              onClick={() => toggle.remove(level)}
              className="cursor-pointer mr-2"
              hidden={level.level === 1}
            />
          </Flex>
        );
      },
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
      disabledKeys: ['label'],
    });
  const { debouncedSearch, search, onSearch } =
    useSearch();

  const deleteOrganizationLv = useDeleteOrganizationLv({
    onSuccess: () => {
      toggle.remove();
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.organization.lv.delete'
        ) as string,
      });
    },
  });

  const { data, isError, isLoading } =
    useListOrganizationLv({
      search: debouncedSearch,
    });

  const processData = (
    level: number,
    levels?: OrganizationLevel[]
  ): OrganizationLevel[] => {
    if (!levels) {
      return [];
    }

    return levels.map((item) => {
      if (!item.child) {
        return {
          ...item,
          level,
        };
      }
      return {
        ...item,
        level,
        child: processData(level + 1, item.child),
      };
    });
  };

  const dataSources = processData(1, data?.data);

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <>
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          tableLayout="fixed"
          rowKey="levelId"
          scroll={{ x: 1300 }}
          loading={isLoading}
          columns={filteredColumns}
          dataSource={dataSources}
          expandable={{
            childrenColumnName: 'child',
          }}
        />
      </Card>
      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle.data?.label_th}
        okButtonProps={{
          loading: deleteOrganizationLv.isLoading,
        }}
        onCancel={() => toggle.remove()}
        onDelete={() =>
          deleteOrganizationLv.submit(toggle.data.levelId)
        }
      />
      <CreateLvOrganizationModal
        open={toggle.openDuplicate}
        parentData={toggle.data}
        onClose={() => toggle.duplicate()}
      />
    </FallbackError>
  );
};
