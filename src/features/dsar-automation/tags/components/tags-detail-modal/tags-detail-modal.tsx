import { Form, Skeleton, Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd/lib/tabs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetTag } from '../../api/get-tag';
import { useUpdateTag } from '../../api/update-tag';

import { TagInfo } from './tag-info';
import { TagsDescription } from './tags-description';

export type TagsDetailModalProps = {
  open: boolean;
  onClose: () => void;
  tagId: string;
};

export const TagsDetailModal = ({
  open,
  onClose,
  tagId,
}: TagsDetailModalProps) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetTag(tagId);

  const editPermission = usePermission({
    moduleName: 'dsar',
    policies: [permissions['pdpakit:dsar:tag:update']],
  });

  const { showNotification } = useNotifications();

  const updateTag = useUpdateTag({
    tagId,
    onSuccess: () => {
      onClose();
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.tags.update'
        ) as string,
      });
    },
  });

  const [form] = Form.useForm();

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <IntlMessage id="dsarAutomation.tags.detail" />
      ),
      key: 'detail',
      children: <TagsDescription data={data} />,
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.tags.detail.basicInfo" />
      ),
      key: 'basic',
      children: (
        <Form form={form} layout="vertical">
          <TagInfo />
        </Form>
      ),
    },
  ];

  useEffect(() => {
    if (data && open) {
      form.setFieldsValue(data);
    }
  }, [data, open, form]);

  const handleUpdateTag = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateTag.submit({
      ...data,
      ...values,
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <>
          <IntlMessage id="dsarAutomation.tags.detail.title" />{' '}
          <Typography.Text type="secondary">
            {data?.name}
          </Typography.Text>
        </>
      }
      afterClose={() => form.resetFields()}
      onOk={handleUpdateTag}
      okButtonProps={{
        loading: updateTag.isLoading,
        disabled: !editPermission.isAllow,
      }}
    >
      <FallbackError isError={isError}>
        <div
          style={{
            minHeight: 'calc(50vh - 200px)',
          }}
        >
          {isLoading ? (
            <Skeleton active />
          ) : (
            <Tabs items={tabItems} />
          )}
        </div>
      </FallbackError>
    </Modal>
  );
};
