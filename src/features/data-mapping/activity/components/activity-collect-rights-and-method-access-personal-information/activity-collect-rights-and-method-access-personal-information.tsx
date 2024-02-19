import {
  DeleteOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Collapse,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  usePagination,
  usePermission,
  useToggle,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteActivityCollectAccess } from '../../api/delete-activity-collect-of-activity-access';
import { useListActivityCollectOfActivityAccess } from '../../api/list-activity-collect-of-activity-access';
import { ActivityCollectOfActivityAccess } from '../../types';

import { ModalAddCollectRightsAndMethodAccessPersonalInformation } from './modal-add-collect-rights-and-method-access-personal-information';
import { ModalDetailAccessPersonalInformation } from './modal-detail-access-personal-information';

type ActivityCollectRightsAndMethodAccessPersonalInformationProps =
  {
    activityId: string;
  };

export const ActivityCollectRightsAndMethodAccessPersonalInformation =
  ({
    activityId,
  }: ActivityCollectRightsAndMethodAccessPersonalInformationProps) => {
    const { t } = useTranslation();
    const {
      page,
      pageSize,
      onPaginationChange,
      Pagination,
    } = usePagination();
    const toggle = useToggle();
    const { showNotification } = useNotifications();

    const { data, isError, isLoading } =
      useListActivityCollectOfActivityAccess(activityId);

    const editPermission = usePermission({
      moduleName: 'datamap',
      policies: [
        permissions['pdpakit:datamap:activity:update'],
      ],
    });

    const deleteAccess = useDeleteActivityCollectAccess({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.collect.rightsAndMethodAccessPersonalInformation.delete'
          ) as string,
        });
        toggle.remove();
      },
      activityId,
    });

    const columns: ColumnsType<ActivityCollectOfActivityAccess> =
      [
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.org" />
          ),
          dataIndex: 'organizationName',
          key: 'organizationName',
          width: 200,
          render: (organizationName) =>
            _.map(organizationName, (v) => (
              <Tag
                key={v}
                className="mx-1 my-1"
                style={{ borderRadius: '20px' }}
              >
                {v}
              </Tag>
            )),
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.purpose" />
          ),
          dataIndex: 'elements',
          key: 'elements',
          width: 150,
          render: (elements) => (
            <div style={{ display: 'block' }}>
              {_.map(elements, (purpose) => (
                <Tooltip
                  key={purpose.purposeID}
                  placement="topLeft"
                  title={purpose?.purposeName}
                >
                  <Tag
                    key={purpose.purposeID}
                    className="mx-1 my-1"
                    style={{ borderRadius: '20px' }}
                  >
                    {purpose.purposeName}
                  </Tag>
                </Tooltip>
              ))}
            </div>
          ),
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.element" />
          ),
          dataIndex: 'elements',
          key: 'elements',
          width: 150,
          render: (elements) =>
            _.map(elements, (element) =>
              _.map(
                element?.subelements?.dataElementName,
                (subElement) => (
                  <Tag
                    key={subElement}
                    className="mx-1 my-1"
                    style={{ borderRadius: '20px' }}
                  >
                    {subElement}
                  </Tag>
                )
              )
            ),
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.dataCategory" />
          ),
          dataIndex: 'elements',
          key: 'elements',
          width: 150,
          ellipsis: {
            showTitle: false,
          },
          render: (elements) =>
            _.map(elements, (v) =>
              _.map(
                v?.subelements?.dataCategoryName,
                (category) => (
                  <Tooltip
                    key={category}
                    placement="topLeft"
                    title={category}
                  >
                    <Tag
                      key={category}
                      className="mx-1 my-1"
                      style={{ borderRadius: '20px' }}
                    >
                      {category}
                    </Tag>
                  </Tooltip>
                )
              )
            ),
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.description" />
          ),
          dataIndex: 'description',
          key: 'description',
          width: 150,
        },
        {
          key: 'action',
          width: 50,
          align: 'right',
          render: (
            data: ActivityCollectOfActivityAccess
          ) => (
            <DropdownTable
              items={[
                {
                  label: (
                    <IntlMessage id="dataMapping.activity.collect.purpose.edit" />
                  ),
                  key: 'edit',
                  icon: <EditOutlined />,
                  onClick: () => toggle.edit?.(data),
                  disabled: !editPermission.isAllow,
                },
                {
                  key: 'delete',
                  label: (
                    <IntlMessage id="dataMapping.activity.collect.purpose.delete" />
                  ),
                  icon: <DeleteOutlined />,
                  onClick: () => toggle.remove(data),
                  disabled: !editPermission.isAllow,
                },
              ]}
            />
          ),
        },
      ];

    return (
      <FallbackError isError={isError}>
        <Collapse defaultActiveKey={1} className="my-3">
          <Collapse.Panel
            header={
              <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation" />
            }
            key={1}
          >
            <Card
              className="border-0"
              extra={
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={() => toggle.create()}
                  disabled={!editPermission.isAllow}
                >
                  {' '}
                  <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.add" />
                </Button>
              }
            >
              <Table
                rowKey="purposeID"
                tableLayout="fixed"
                scroll={{
                  x: 700,
                }}
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
              {/* <ActivityCollectAddPurposeModal
                loading={addPurpose.isLoading}
                open={toggle.openCreate}
                onClose={() => toggle.create()}
                onFinish={onAddPurpose}
                existingDataPurposeId={
                  existingDataPurposeId
                }
                activityId={activityId}
              /> */}
              <DeleteModal
                open={toggle.openRemove}
                identifier={toggle.data?.name}
                okButtonProps={{
                  loading: deleteAccess.isLoading,
                }}
                onCancel={() => toggle.remove()}
                onDelete={() =>
                  deleteAccess.submit(
                    toggle.data.ObjectUUID
                  )
                }
              />
            </Card>
          </Collapse.Panel>
        </Collapse>
        <ModalAddCollectRightsAndMethodAccessPersonalInformation
          onClose={() => toggle.create()}
          open={toggle.openCreate}
          activityId={activityId}
        />
        <ModalDetailAccessPersonalInformation
          onClose={() => toggle.edit()}
          open={toggle.openEdit}
          activityId={activityId}
          accessId={toggle?.data?.ObjectUUID}
        />
      </FallbackError>
    );
  };
