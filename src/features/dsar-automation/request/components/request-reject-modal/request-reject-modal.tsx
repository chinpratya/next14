import { Cascader, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetRequestMeta } from '../../api/get-request-meta';
import { useRejectRequest } from '../../api/reject-request';

type RequestRejectModalProps = {
  open: boolean;
  onCancel: () => void;
  requestId: string;
};

export const RequestRejectModal = ({
  open,
  onCancel,
  requestId,
}: RequestRejectModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { data: requestMeta, ...meta } =
    useGetRequestMeta();

  const { submit, isLoading } = useRejectRequest({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.request.reject'
        ) as string,
      });
      onCancel();
    },
  });

  const reasonOptions = requestMeta?.reasonForStatus?.map(
    (reason) => ({
      label: reason.name,
      value: reason.ObjectUUID,
      children: reason?.reason?.map((reason) => ({
        label: reason.name,
        value: reason.ObjectUUID,
      })),
    })
  );

  return (
    <Modal
      title={
        <IntlMessage id="dsarAutomation.request.reject.title" />
      }
      open={open}
      onCancel={onCancel}
      okText={
        <IntlMessage id="dsarAutomation.request.reject" />
      }
      onOk={() => form.submit()}
      okButtonProps={{
        danger: true,
        loading: isLoading,
      }}
      centered
      afterClose={() => form.resetFields()}
      loading={meta.isLoading}
    >
      <Form
        form={form}
        onFinish={(values) =>
          submit({
            ...values,
            reason: values.reason?.[1],
          })
        }
        layout="vertical"
      >
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.request.reason" />
          }
          name="reason"
          rules={[
            validation.required(
              t('dsarAutomation.request.reasonRequired')
            ),
          ]}
        >
          <Cascader options={reasonOptions} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.request.message" />
          }
          name="massage"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
