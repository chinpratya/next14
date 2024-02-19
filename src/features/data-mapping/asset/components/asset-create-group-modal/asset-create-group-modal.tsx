import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/share-components/modal';
import { useGetOrganizationInfo } from '@/features/admin';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateGroup } from '../../../group';

type AssetCreateGroupModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const AssetCreateGroupModal = ({
  open,
  onCancel,
}: AssetCreateGroupModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const organization = useGetOrganizationInfo();

  const createGroup = useCreateGroup({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.group.create'
        ) as string,
      });
      onCancel();
    },
  });

  const onCreateGroup = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    createGroup.submit({
      ...values,
      menuID: 'Asset',
      organizationID: organization.data?.departmentId,
    });
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.group.create.title" />
      }
      open={open}
      onOk={onCreateGroup}
      onCancel={onCancel}
      width={600}
      okButtonProps={{ loading: createGroup.isLoading }}
      afterClose={() => form.resetFields()}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="name"
          label={
            <IntlMessage id="dataMapping.asset.name" />
          }
          rules={[
            validation.required(
              t('dataMapping.asset.nameRequired')
            ),
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
