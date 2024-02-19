import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useGetOrganizationInfo } from '@/features/admin';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateGroup } from '../../../group';

type DataCategoriesCreateDataSubjectModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const DataCategoriesCreateDataSubjectModal = ({
  open,
  onCancel,
}: DataCategoriesCreateDataSubjectModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const organization = useGetOrganizationInfo();

  const createDataSubject = useCreateGroup({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataCategories.dataSubject.create'
        ) as string,
      });
      onCancel();
    },
  });

  const onCreateDataSubject = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    createDataSubject.submit({
      ...values,
      menuID: 'data-subject',
      organizationID: organization.data?.departmentId,
    });
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.dataCategories.createDataSubjectGroup" />
      }
      open={open}
      onOk={onCreateDataSubject}
      onCancel={onCancel}
      width={600}
      okButtonProps={{
        loading: createDataSubject.isLoading,
      }}
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
