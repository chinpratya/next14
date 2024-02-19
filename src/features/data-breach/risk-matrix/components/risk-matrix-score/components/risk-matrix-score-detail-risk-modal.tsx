import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateRiskScoreRisk } from '../../../api/update-risk-matrix-score-risk';
import { RiskMatrixScoreRiskDetail } from '../../../types';

export type RiskMatrixScoreDetailRiskModalProps = {
  open: boolean;
  onClose: () => void;
  data: RiskMatrixScoreRiskDetail;
  riskMatrixId: string;
};

export const RiskMatrixScoreDetailRiskModal = ({
  open,
  onClose,
  data,
  riskMatrixId,
}: RiskMatrixScoreDetailRiskModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const updateRisk = useUpdateRiskScoreRisk({
    riskMatrixId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.common.notification.saved
        ) as string,
      });
      onClose();
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage
          id={
            tokens.dataBreach.riskMatrix.editRiskDetails
          }
        />
      }
      onOk={() =>
        updateRisk.submit({
          data: form.getFieldsValue(),
          scoreId: data.riskID,
        })
      }
      okButtonProps={{ loading: updateRisk.isLoading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={
            <IntlMessage
              id={tokens.dataBreach.riskMatrix.riskLevel}
            />
          }
          rules={[
            validation.required(
              t(
                tokens.dataBreach.riskMatrix
                  .riskLevelRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <IntlMessage
              id={tokens.dataBreach.request.description}
            />
          }
          rules={[
            validation.required(
              t(
                tokens.dataBreach.request
                  .descriptionRequired
              )
            ),
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
