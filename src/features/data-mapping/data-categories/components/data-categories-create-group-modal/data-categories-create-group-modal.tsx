import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useGetOrganizationInfo } from '@/features/admin';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateGroup } from '../../../group';

type DataCategoriesCreateGroupModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const DataCategoriesCreateGroupModal = ({
  open,
  onCancel,
}: DataCategoriesCreateGroupModalProps) => {
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
      menuID: 'Data-Categories',
      organizationID: organization.data?.departmentId,
    });
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.dataCategories.createGroup" />
      }
      open={open}
      onOk={onCreateGroup}
      onCancel={onCancel}
      width={600}
      okButtonProps={{ loading: createGroup.isLoading }}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={
            <IntlMessage id="dataMapping.dataCategories.name" />
          }
          rules={[
            validation.required(
              t('dataMapping.dataCategories.nameRequired')
            ),
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
