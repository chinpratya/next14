import { Cascader, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCloseRequest } from '../../api/close-request';
import { useGetRequestMeta } from '../../api/get-request-meta';

export type RequestCloseModalProps = {
  open: boolean;
  onCancel: () => void;
  requestId: string;
};

export const RequestCloseModal = ({
  open,
  onCancel,
  requestId,
}: RequestCloseModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { data: requestMeta, ...meta } =
    useGetRequestMeta();

  const { submit, isLoading } = useCloseRequest({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.request.notifications.close
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
        <IntlMessage
          id={tokens.dataBreach.request.closeTitle}
        />
      }
      open={open}
      onCancel={onCancel}
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
            reason: values.reason[1],
          })
        }
        layout="vertical"
      >
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.reason}
            />
          }
          name="reason"
          rules={[
            validation.required(
              t(tokens.dataBreach.request.reasonRequired)
            ),
          ]}
        >
          <Cascader options={reasonOptions} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.message}
            />
          }
          name="massage"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
