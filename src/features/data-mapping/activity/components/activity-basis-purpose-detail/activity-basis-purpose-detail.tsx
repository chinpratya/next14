import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Collapse,
  Table,
  Skeleton,
  Typography,
  Row,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';

import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetActivityBasis } from '../../api/get-activity-basis';
import { useUpdateActivityBasis } from '../../api/update-activity-basis';
import { ActivityBasisDetail } from '../../types';

import { ActivityBasisPurposeDetailAddModal } from './activity-basis-purpose-detail-add-modal';
import { ActivityBasisPurposeDetailModal } from './activity-basis-purpose-detail-modal';

type ActivityBasisPurposeDetailProps = {
  activityId: string;
  basisId: string;
};

export const ActivityBasisPurposeDetail = ({
  activityId,
  basisId,
}: ActivityBasisPurposeDetailProps) => {
  const [form] = Form.useForm();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const { data, isLoading } = useGetActivityBasis({
    activityId,
    basisId,
  });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  const updateActivityBasis = useUpdateActivityBasis({
    activityId,
    basisId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update activity basis success',
      });
      toggle.remove();
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const columns: ColumnsType<ActivityBasisDetail> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.lawfulBasis.basis.detail" />
      ),
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.lawfulBasis.basis.attachedDoc" />
      ),
      dataIndex: 'fileUrl',
      key: 'fileUrl',
      ellipsis: true,
      width: 100,
      render: (fileUrl: string[]) => {
        return (
          <Row
            style={{
              width: '100%',
            }}
          >
            {fileUrl.map((value, index) => {
              return (
                <Typography.Link
                  key={value}
                  className="w-100 mx-1"
                  href={value}
                  target={'_blank'}
                >
                  {index + 1}.{' '}
                  {value?.split('/').reverse()[0]}
                </Typography.Link>
              );
            })}
          </Row>
        );
      },
    },
    {
      key: 'action',
      width: 50,
      align: 'center',
      render: (Basis: ActivityBasisDetail) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="dataMapping.activity.lawfulBasis.basis.edit" />
              ),
              icon: <EditOutlined />,
              onClick: () => toggle.preview(Basis),
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="dataMapping.activity.lawfulBasis.basis.delete" />
              ),
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(Basis),
            },
          ]}
        />
      ),
    },
  ];
  const onDelete = (name: string) => {
    const filterdetail = data?.detail.filter(
      (detail) => detail.description !== name
    );
    const payload = {
      ...data,
      detail: filterdetail,
    };

    updateActivityBasis.submit(payload);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Collapse defaultActiveKey={1}>
          <Collapse.Panel
            header={
              <IntlMessage id="dataMapping.activity.lawfulBasis.basis.attachedDoc" />
            }
            key={1}
          >
            <Card
              bordered={false}
              extra={
                <Button
                  type={'link'}
                  icon={<PlusOutlined />}
                  onClick={() => toggle.create()}
                  disabled={!editPermission.isAllow}
                >
                  <IntlMessage id="dataMapping.activity.lawfulBasis.basis.addFile" />
                </Button>
              }
            >
              <Table
                columns={columns}
                dataSource={data?.detail ?? []}
              />
            </Card>
          </Collapse.Panel>
        </Collapse>
      )}
      <ActivityBasisPurposeDetailAddModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
        activityId={activityId}
        basisId={basisId}
        data={data}
      />
      <ActivityBasisPurposeDetailModal
        open={toggle.openPreview}
        onCancel={() => toggle.preview()}
        activityId={activityId}
        basisId={basisId}
        data={data}
        dataDetail={toggle.data}
      />
      <DeleteModal
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        identifier={toggle.data?.description}
        onDelete={() =>
          onDelete(toggle.data?.description)
        }
        okButtonProps={{
          loading: updateActivityBasis.isLoading,
        }}
      />
    </>
  );
};
