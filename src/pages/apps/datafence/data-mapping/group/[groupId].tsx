import { Button, Card, Descriptions, Form } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/components/share-components/loading';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { FallbackError } from '@/components/util-components/fallback-error';
import {
  GroupForm,
  useGetGroup,
  useUpdateGroup,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { usePermission } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const GroupDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const groupId = router.query.groupId as string;

  const { data, isError, isLoading } =
    useGetGroup(groupId);

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:group:update'],
    ],
  });

  const updateGroup = useUpdateGroup({
    groupId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.group.update'
        ) as string,
      });
    },
  });

  const handlerUpdateGroup = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateGroup.submit(values);
  };

  useEffect(() => {
    if (data) form.setFieldsValue(data);
  }, [data, form]);

  if (isLoading) return <Loading cover="content" />;

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.group.edit.title" />
        }
        subtitle={data?.name}
        onBack={router.back}
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions['pdpakit:datamap:group:update'],
            ]}
          >
            <Button
              onClick={router.back}
              className="mr-1"
            >
              <IntlMessage id="dataMapping.group.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={handlerUpdateGroup}
              loading={updateGroup.isLoading}
            >
              <IntlMessage id="dataMapping.group.save" />
            </Button>
          </PermissionWrapper>
        }
      />
      <Card
        title={<IntlMessage id="dataMapping.basicInfo" />}
      >
        <Descriptions
          column={4}
          layout="vertical"
          labelStyle={{ fontWeight: 'bold' }}
        >
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.group.createdDt" />
            }
          >
            <ShowTagDate date={data?.created_dt} />
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.group.createdBy" />
            }
          >
            {data?.created_by}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.group.updatedDt" />
            }
          >
            <ShowTagDate date={data?.updated_dt} />
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.group.updatedBy" />
            }
          >
            {data?.updated_by}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <GroupForm
        form={form}
        disabled={!editPermission.isAllow}
      />
    </FallbackError>
  );
};

GroupDetailPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default GroupDetailPage;
