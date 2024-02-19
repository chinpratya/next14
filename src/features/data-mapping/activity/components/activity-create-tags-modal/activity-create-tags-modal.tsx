import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateTags } from '../../../tags';

type ActivityCreateTagsModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const ActivityCreateTagsModal = ({
  open,
  onCancel,
}: ActivityCreateTagsModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const createTag = useCreateTags({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.tags.create'
        ) as string,
      });
      onCancel();
    },
  });

  const onCreateTag = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    createTag.submit(value);
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.activity.activityDetail.createTags" />
      }
      open={open}
      onOk={onCreateTag}
      onCancel={onCancel}
      width={600}
      okButtonProps={{ loading: createTag.isLoading }}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={
            <IntlMessage id="dataMapping.activity.activityDetail.name" />
          }
          rules={[
            validation.required(
              t(
                'dataMapping.activity.activityDetail.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
