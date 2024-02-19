import { Form, Skeleton, Tabs, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/share-components/modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDataMappingOrganizations } from '../../api/get-data-mapping-organization';
import { useUpdateDataMappingOrganizations } from '../../api/update-data-mapping-organizations';
import { OrganizationDetailForm } from '../organization-detail-form';

import { OrganizationDetailDescription } from './organization-detail-description';

export type OrganizationDetailModalProps = {
  open: boolean;
  onClose: () => void;
  organizationId?: string;
};

export const OrganizationDetailModal = ({
  open,
  onClose,
  organizationId,
}: OrganizationDetailModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } =
    useGetDataMappingOrganizations(organizationId);

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:organization:update'],
    ],
  });

  const update = useUpdateDataMappingOrganizations({
    organizationsId: organizationId ?? '',
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.organization.update'
        ) as string,
      });
      onClose();
    },
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onUpdate = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    update.submit(value);
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <>
          <IntlMessage id="dataMapping.organization.detail" />{' '}
          <Typography.Text type="secondary">
            {data?.name}
          </Typography.Text>
        </>
      }
      onOk={onUpdate}
      okButtonProps={{
        loading: update.isLoading,
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
                  <IntlMessage id="dataMapping.organization.description" />
                ),
                key: 'description',
                children: (
                  <OrganizationDetailDescription
                    data={data}
                  />
                ),
              },
              {
                label: (
                  <IntlMessage id="dataMapping.organization.info" />
                ),
                key: 'info',
                children: (
                  <OrganizationDetailForm form={form} />
                ),
              },
            ]}
          />
        )}
      </FallbackError>
    </Modal>
  );
};
