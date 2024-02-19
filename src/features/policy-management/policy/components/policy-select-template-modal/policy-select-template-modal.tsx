import { Form, Input, Select } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreatePolicy } from '../../api/create-policy';
import { useGetPolicyTemplate } from '../../api/get-policy-template';

export type PolicySelectTemplateModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const PolicySelectTemplateModal = ({
  open,
  onCancel,
}: PolicySelectTemplateModalProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { data } = useGetPolicyTemplate();

  const typeOptions = data?.type?.map((type) => ({
    value: type.th.template_id,
    label: type.th.template_name,
  }));

  const createPolicy = useCreatePolicy({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'policyManagement.notification.policy.create'
        ) as string,
      });
      onCancel();
      router.back();
    },
  });

  const handlerCreatePolicy = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    createPolicy.submit({
      ...values,
      action: 'creation',
    });
  };

  return (
    <Modal
      title={
        <IntlMessage id="policyManagement.policy.create.title" />
      }
      open={open}
      onCancel={onCancel}
      okText={
        <IntlMessage id="policyManagement.policy.create" />
      }
      onOk={handlerCreatePolicy}
      okButtonProps={{ loading: createPolicy.isLoading }}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="policyManagement.policy.create.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'policyManagement.policy.create.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="policyManagement.policy.create.description" />
          }
          name="description"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="policyManagement.policy.create.type" />
          }
          name="policy_type"
          rules={[
            validation.required(
              t(
                'policyManagement.policy.create.typeRequire'
              )
            ),
          ]}
        >
          <Select options={typeOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
