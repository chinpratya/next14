import {
  Form,
  Tabs,
  Descriptions,
  Skeleton,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetTags } from '../../../../data-mapping/tags';
import { useUpdateTags } from '../../../../data-mapping/tags';
import { TagsCreateForm } from '../tags-create-form';

type TagsDetailModalProps = {
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
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const { data, isError, isLoading } = useGetTags(tagId);

  const editPermission = usePermission({
    moduleName: 'consent',
    policies: [permissions['pdpakit:consent:tag:update']],
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, [data, form]);

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'consentManagement.notification.tags.update'
      ) as string,
    });
    onClose();
  };

  const { submit, isLoading: updataLoading } =
    useUpdateTags({
      onSuccess,
      tagId,
    });

  const onCreate = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    console.log('onCreate', form.getFieldsValue());

    submit({
      name: value.name ? value.name : data?.name,
    });
  };

  return (
    <Modal
      title={
        <>
          <IntlMessage id="consentManagement.tags.detail.title" />{' '}
          <Typography.Text type="secondary">
            {data?.name}
          </Typography.Text>
        </>
      }
      open={open}
      onCancel={onClose}
      onOk={onCreate}
      okButtonProps={{
        loading: updataLoading,
        disabled: !editPermission.isAllow,
      }}
    >
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <Tabs
            items={[
              {
                label: (
                  <IntlMessage id="consentManagement.tags.description" />
                ),
                key: 'description',
                children: (
                  <Descriptions
                    column={{
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                    layout="vertical"
                    labelStyle={{ fontWeight: 'bold' }}
                  >
                    <Descriptions.Item
                      label={
                        <IntlMessage id="consentManagement.tags.createdDt" />
                      }
                    >
                      <ShowTagDate
                        date={data?.createdDt}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <IntlMessage id="consentManagement.tags.createdBy" />
                      }
                    >
                      {data && data?.createdBy !== ''
                        ? data?.createdBy
                        : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <IntlMessage id="consentManagement.tags.updatedDt" />
                      }
                    >
                      <ShowTagDate
                        date={data?.updatedDt}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <IntlMessage id="consentManagement.tags.updatedBy" />
                      }
                    >
                      {data && data?.updatedBy !== ''
                        ? data?.updatedBy
                        : '-'}
                    </Descriptions.Item>
                  </Descriptions>
                ),
              },
              {
                label: (
                  <IntlMessage id="consentManagement.tags.basicInfo" />
                ),
                key: 'base-info',
                children: (
                  <TagsCreateForm
                    form={form}
                    tagId={tagId}
                  />
                ),
              },
            ]}
          />
        )}
      </FallbackError>
    </Modal>
  );
};
