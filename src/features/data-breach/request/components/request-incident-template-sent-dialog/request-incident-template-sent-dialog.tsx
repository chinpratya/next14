import { Form, Input, Select } from 'antd';

import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';

import { IncidentTemplateEventFormType } from '../../../incident-template';
import { useSentRequestIncidentTemplate } from '../../api/sent-request-incident-template';

export type RequestIncidentTemplateSentDialogProps = {
  requestId: string;
  open?: boolean;
  onClose?: () => void;
};
export const RequestIncidentTemplateSentDialog = ({
  requestId,
  open,
  onClose,
}: RequestIncidentTemplateSentDialogProps) => {
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const { submit, isLoading } =
    useSentRequestIncidentTemplate({
      requestId,
      onSuccess: () => {
        onClose?.();
        showNotification({
          type: 'success',
          message: 'Sent incident template successfully.',
        });
      },
    });

  const onSent = async () => {
    await form.validateFields();
    submit({
      data: queryClient.getQueryData([
        dataBreachQueryKeys.request.incidentTemplate(
          requestId
        ),
      ]) as IncidentTemplateEventFormType,
      senderInfo: await form.getFieldsValue(),
    });
  };

  return (
    <Modal
      title="แจ้ง สคส."
      open={open}
      onCancel={onClose}
      okText="ส่งรายงาน สคส."
      okButtonProps={{
        loading: isLoading,
      }}
      onOk={onSent}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="ชื่อเหตุการณ์"
          name="header"
          rules={[
            validation.required('กรุณากรอกชื่อเหตุการณ์'),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="ถึง" required>
          <Input
            disabled
            placeholder="saraban@pdpc.or.th"
          />
        </Form.Item>
        <Form.Item
          label="สำเนา"
          name="sender"
          rules={[
            validation.required('กรุณาเลือกสำเนา'),
            {
              validator: (_, value) => {
                const validationErrors: string[] = [];

                value.forEach((email: string) => {
                  if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                      email
                    )
                  ) {
                    validationErrors.push(
                      `'${email}' is not a valid email`
                    );
                  }
                });

                return validationErrors.length === 0
                  ? Promise.resolve()
                  : Promise.reject(validationErrors);
              },
            },
          ]}
        >
          <Select mode="tags" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
