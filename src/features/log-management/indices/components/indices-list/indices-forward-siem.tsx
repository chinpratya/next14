import { css } from '@emotion/css';
import { Form, Input, Modal, Typography } from 'antd';
import { Trans, useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';

import { useLogForward } from '../../api/log-forward';
import { Indice } from '../../types';

type IndicesForwardSiemProps = {
  indice: Indice;
  open: boolean;
  onCancel: () => void;
};

export const IndicesForwardSiem = ({
  open,
  indice,
  onCancel,
}: IndicesForwardSiemProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useLogForward({
    indiceId: indice?.id,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
      onCancel();
    },
  });

  const onSubmit = async () => {
    await form.validateFields();
    submit({ forward_siem: !indice.forward_siem });
  };

  return (
    <Modal
      title={
        indice?.forward_siem
          ? 'คุณต้องการลบการส่งข้อมูลบันทึกไปยังเครื่องมือวิเคราะห์หรือไม่?'
          : 'คุณต้องการส่งข้อมูลบันทึกไปยังเครื่องมือช่วยวิเคราะห์และตรวจสอบ หรือไม่?'
      }
      width={600}
      centered
      open={open}
      destroyOnClose
      onOk={onSubmit}
      onCancel={onCancel}
      maskClosable={!isLoading}
      okButtonProps={{
        loading: isLoading,
        danger: indice?.forward_siem,
      }}
      afterClose={() => form.resetFields()}
    >
      {indice?.forward_siem ? (
        <>
          <Typography className="text-gray mt-2">
            เนื่องจากเเครื่องมือนี้มีบทบาทในการจัดการข้อมูลบันทึกเพื่อรักษาความปลอดภัยหรือป้องกันการแชร์ข้อมูลบันทึกที่ไม่ได้รับอนุญาต
          </Typography>
        </>
      ) : (
        <>
          <Typography.Paragraph className="text-gray">
            เครื่องมือนี้มีความสามารถในการส่งต่อข้อมูล Log
            ไปยังระบบ SIEM
            เพื่อการวิเคราะห์และตรวจสอบเหตุการณ์ที่ผิดปกติ
            ดังนั้น เมนูนี้จะใช้พื้นที่การจัดเก็บของ log
            management เท่านั้น
          </Typography.Paragraph>
        </>
      )}
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          confirm: '',
        }}
        validateTrigger={['onSubmit']}
      >
        <Form.Item
          name="confirm"
          className={css`
            margin-top: 1.5rem;

            .ant-form-item-label label {
              font-weight: 400;
            }
          `}
          label={
            <Trans
              i18nKey="deleteLabel"
              values={{ identifier: indice?.name }}
              components={{ bold: <strong /> }}
            />
          }
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject(
                    new Error(
                      'Please type confirm to continue.'
                    )
                  );
                }
                if (value === indice?.name) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error(
                    `Please type correct confirm to continue.`
                  )
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
