import { DeleteOutlined } from '@ant-design/icons';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { DropdownTable } from '@/components/share-components/dropdown-table';
import { NoneProfile } from '@/components/share-components/none-profile';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  usePagination,
  usePermission,
  useToggle,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';

import { useDeleteWhitelist } from '../../api/delete-whitelist';
import { useListWhitelist } from '../../api/list-whitelist';
import { Whitelist } from '../../types';

export const whitelistType = {
  NETWORK:
    'ก. ข้อมูลอินเทอร์เน็ตที่เกิดจากการ เข้าถึงระบบเครือข่าย',
  MAIL_SERVER:
    'ข. ข้อมูลอินเทอร์เน็ตบนเครื่อง ผู้ให้บริการจดหมายอิเล็กทรอนิกส์ (e-mail servers)',
  FILE: 'ค. ข้อมูลอินเทอร์เน็ตจากการโอน แฟ้มข้อมูลบนเครื่องให้บริการโอน แฟ้มข้อมูล',
  WEB: 'ง. ข้อมูลอินเทอร์เน็ตบนเครื่อง ผู้ให้บริการเว็บ',
  USENET:
    'จ. ชนิดของข้อมูลบนเครือข่าย คอมพิวเตอร์ขนาดใหญ่ (Usenet)',
  MESSAGE:
    'ฉ. ข้อมูลที่เกิดจากการโต้ตอบกันบน เครือข่ายอินเทอร์เน็ต เช่น Internet Relay Chat (IRC) หรือ Instance Messaging (IM) เป็นต้น',
  OTHER: 'อื่นๆ',
} as { [key: string]: string };

export const WhitelistList = () => {
  const router = useRouter();
  const toggle = useToggle();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { showNotification } = useNotifications();

  const deletePermission = usePermission({
    moduleName: 'log',
    policies: [permissions['cyber:lm:whitelist:delete']],
  });

  const { data, isLoading, isError } = useListWhitelist({
    page,
    page_size: pageSize,
  });

  const deleteWhitelist = useDeleteWhitelist({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.deleted'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<Whitelist> = [
    {
      title: (
        <IntlMessage id="logManagement.whitelist.hostnameIPAddress" />
      ),
      key: 'target',
      render: (whitelist: Whitelist) => (
        <Link href={`${router.pathname}/${whitelist.id}`}>
          {whitelist.target}
        </Link>
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.whitelist.type" />
      ),
      dataIndex: 'type',
      key: 'type',
      ellipsis: true,
      render: (value) => whitelistType[value],
    },
    {
      title: (
        <IntlMessage id="logManagement.createdDate" />
      ),
      dataIndex: 'created_date',
      key: 'createdDate',
      align: 'center',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'createdBy',
      title: <IntlMessage id="logManagement.createdBy" />,
      dataIndex: 'created_by',
      align: 'center',
      render: (profile: string) => (
        <NoneProfile title={profile} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (whitelist: Whitelist) => (
        <DropdownTable
          items={[
            {
              key: 'delete',
              label: (
                <IntlMessage id="logManagement.delete" />
              ),
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => toggle.remove(whitelist),
            },
          ]}
        />
      ),
    },
  ];

  const totalRecord =
    (data?.meta?.totalPage || 1) * pageSize;

  return (
    <FallbackError isError={isError}>
      <Card>
        <Table
          rowKey="id"
          dataSource={data?.data}
          columns={columns}
          pagination={false}
          loading={isLoading}
        />
        <Pagination
          total={totalRecord}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
      <DeleteModal
        open={toggle.openRemove}
        loading={deleteWhitelist.isLoading}
        identifier={toggle.data?.target as string}
        data={toggle.data}
        onDelete={(whitelist) =>
          deleteWhitelist.submit(whitelist?.id as string)
        }
        onCancel={() => toggle.remove()}
      />
    </FallbackError>
  );
};
