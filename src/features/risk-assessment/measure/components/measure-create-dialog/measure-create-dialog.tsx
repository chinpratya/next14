import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { TagsFormItem } from '../../../tags';
import { useCreateMeasure } from '../../api/create-measure';

export type MeasureCreateDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

export const MeasureCreateDialog = ({
  open,
  onClose,
}: MeasureCreateDialogProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const { submit, isLoading } = useCreateMeasure({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.riskAssessment.riskMeasures.notifications
            .create
        ) as string,
      });
      onClose?.();
    },
  });

  const handleCreateMeasure = async () => {
    await form.validateFields();
    submit(await form.getFieldsValue());
  };

  return (
    <Modal
      title={
        <IntlMessage
          id={
            tokens.riskAssessment.riskMeasures.createTitle
          }
        />
      }
      open={open}
      onCancel={onClose}
      onOk={handleCreateMeasure}
      okButtonProps={{
        loading: isLoading,
      }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage
              id={tokens.riskAssessment.riskMeasures.name}
            />
          }
          name="name"
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskMeasures
                  .nameRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <TagsFormItem name="tagID" />
      </Form>
    </Modal>
  );
};
