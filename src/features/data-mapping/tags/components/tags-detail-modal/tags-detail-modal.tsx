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

import { useGetTags } from '../../api/get-tags';
import { useUpdateTags } from '../../api/update-tags';
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
    moduleName: 'datamap',
    policies: [permissions['pdpakit:datamap:tag:update']],
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
        'dataMapping.notification.tags.update'
      ) as string,
    });
    onClose();
  };

  const { submit, isLoading: updateLoading } =
    useUpdateTags({
      onSuccess,
      tagId,
    });

  const onCreate = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();

    submit({
      name: value.name ? value.name : data?.name,
    });
  };

  return (
    <Modal
      title={
        <>
          <IntlMessage id="dataMapping.tags.detail.title" />{' '}
          <Typography.Text type="secondary">
            {data?.name}
          </Typography.Text>
        </>
      }
      open={open}
      onCancel={onClose}
      onOk={onCreate}
      okButtonProps={{
        loading: updateLoading,
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
                  <IntlMessage id="dataMapping.tags.description" />
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
                        <IntlMessage id="dataMapping.tags.createdDt" />
                      }
                    >
                      <ShowTagDate
                        date={data?.createdDt}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <IntlMessage id="dataMapping.tags.createdBy" />
                      }
                    >
                      {data && data?.createdBy !== ''
                        ? data?.createdBy
                        : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <IntlMessage id="dataMapping.tags.updatedDt" />
                      }
                    >
                      <ShowTagDate
                        date={data?.updatedDt}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <IntlMessage id="dataMapping.tags.updatedBy" />
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
                  <IntlMessage id="dataMapping.tags.basicInfo" />
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
