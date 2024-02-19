import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { usePublishIncidentTemplate } from '../../api/publish-incident-template';

export type IncidentTemplateStatusDialogProps = {
  open?: boolean;
  onClose?: () => void;
  incidentTemplateId: string;
  currentStatus?: string;
};

export const IncidentTemplateStatusDialog = ({
  open,
  onClose,
  incidentTemplateId,
  currentStatus,
}: IncidentTemplateStatusDialogProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { showNotification } = useNotifications();

  const publishIncidentTemplate =
    usePublishIncidentTemplate({
      incidentTemplateId: incidentTemplateId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.dataBreach.incidentTemplate
              .notifications.changed
          ) as string,
        });
        onClose?.();
      },
    });

  const onUpdate = async () => {
    await form.validateFields();
    publishIncidentTemplate.submit(
      form.getFieldValue('status')
    );
  };

  return (
    <Modal
      title={
        <IntlMessage
          id={
            tokens.dataBreach.incidentTemplate.editStatus
          }
        />
      }
      open={open}
      onCancel={onClose}
      afterClose={() => {
        form.resetFields();
      }}
      onOk={onUpdate}
      okButtonProps={{
        loading: publishIncidentTemplate.isLoading,
      }}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.dataBreach.incidentTemplate.status
              }
            />
          }
          name="status"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.incidentTemplate
                  .statusRequired
              )
            ),
          ]}
        >
          <Select
            options={[
              {
                label: <ShowTagStatus status="active" />,
                value: 'active',
                disabled: currentStatus === 'active',
              },
              {
                label: (
                  <ShowTagStatus
                    status="inactive"
                    items={[
                      {
                        key: 'inactive',
                        label:
                          tokens.common.status.inactive,
                        color: 'rgba(69,85,96,0.55)',
                      },
                    ]}
                  />
                ),
                value: 'inactive',
                disabled: currentStatus === 'inactive',
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
