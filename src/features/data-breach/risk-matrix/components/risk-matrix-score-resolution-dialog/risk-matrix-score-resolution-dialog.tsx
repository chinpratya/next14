import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateRiskMatrixScoreResolution } from '../../api/update-risk-matrix-score-resolution';

export type RiskMatrixScoreResolutionDialogProps = {
  open?: boolean;
  onClose?: () => void;
  riskMatrixId: string;
  currentResolution?: string;
};

export const RiskMatrixScoreResolutionDialog = ({
  open,
  onClose,
  riskMatrixId,
  currentResolution,
}: RiskMatrixScoreResolutionDialogProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { showNotification } = useNotifications();

  const updateRiskMatrixScoreResolution =
    useUpdateRiskMatrixScoreResolution({
      riskMatrixId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.dataBreach.riskMatrix.notifications
              .updateScoreResolution
          ) as string,
        });
        onClose?.();
      },
    });

  const onUpdate = async () => {
    await form.validateFields();
    updateRiskMatrixScoreResolution.submit(
      form.getFieldValue('resolution')
    );
  };

  return (
    <Modal
      title={
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.editRiskScore}
        />
      }
      open={open}
      onCancel={onClose}
      afterClose={() => {
        form.resetFields();
      }}
      onOk={onUpdate}
      okButtonProps={{
        loading:
          updateRiskMatrixScoreResolution.isLoading,
      }}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.riskMatrix.resolution}
            />
          }
          name="resolution"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.riskMatrix
                  .resolutionRequired
              )
            ),
          ]}
        >
          <Select
            options={[
              {
                label: '3',
                value: '3',
                disabled: currentResolution === '3',
              },
              {
                label: '4',
                value: '4',
                disabled: currentResolution === '4',
              },
              {
                label: '5',
                value: '5',
                disabled: currentResolution === '5',
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
