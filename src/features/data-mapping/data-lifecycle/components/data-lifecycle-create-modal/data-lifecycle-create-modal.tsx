import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal, ModalProps } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { ActivitySelect } from '../../../activity';
import { useCreateDataLifecycle } from '../../api/create-data-lifecycle';

export type DataLifecycleCreateModalProps = ModalProps & {
  onCancel?: () => void;
};

export const DataLifecycleCreateModal = ({
  onCancel,
  ...modalProps
}: DataLifecycleCreateModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();

  const createDataLifeCycle = useCreateDataLifecycle({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataLifecycle.create'
        ) as string,
      });
      onCancel?.();
    },
  });

  const handleOk = async () => {
    await form.validateFields();
    const activityId = form.getFieldValue('activityId');
    createDataLifeCycle.submit(activityId);
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.dataLifecycle.create.title" />
      }
      {...modalProps}
      onCancel={onCancel}
      onOk={handleOk}
      okButtonProps={{
        loading: createDataLifeCycle.isLoading,
      }}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.create.activity" />
          }
          name="activityId"
          rules={[
            validation.required(
              t(
                'dataMapping.dataLifecycle.create.activityRequired'
              )
            ),
          ]}
        >
          <ActivitySelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};
