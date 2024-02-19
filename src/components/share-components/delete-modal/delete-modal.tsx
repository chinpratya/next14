import { css } from '@emotion/css';
import {
  Form,
  Input,
  Modal,
  ModalProps,
  Typography,
} from 'antd';
import { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';

export type DeleteModalProps = ModalProps & {
  loading?: boolean;
  title?: string | ReactNode;
  content?: string | ReactNode;
  identifier?: string;
  icon?: ReactNode;
  hasIdentifier?: boolean;
  data?: Record<string, unknown>;
  onDelete?: (data?: Record<string, unknown>) => void;
  onCancel: () => void;
};

export const DeleteModal = ({
  loading,
  title = <IntlMessage id="deleteTitle" />,
  content = <IntlMessage id="deleteContent" />,
  width = 750,
  icon,
  identifier,
  hasIdentifier = true,
  data,
  onDelete,
  onCancel,
  ...props
}: DeleteModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  if (!identifier) {
    identifier = 'confirm';
  }

  const onSubmit = async () => {
    await form.validateFields();
    onDelete?.(data);
  };

  return (
    <Modal
      title={
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: 12px;

            .anticon {
              font-size: 24px;
            }
          `}
        >
          {icon}
          {title}
        </div>
      }
      centered
      width={width}
      onCancel={onCancel}
      onOk={onSubmit}
      {...props}
      okButtonProps={{
        danger: true,
        loading,
        ...props.okButtonProps,
      }}
      afterClose={() => form.resetFields()}
    >
      <Typography className="text-gray">
        {content}
      </Typography>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          confirm: '',
        }}
        validateTrigger={['onSubmit']}
      >
        {hasIdentifier && (
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
                values={{ identifier }}
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
                  if (value === identifier) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      t('deleteIncorrect') as string
                    )
                  );
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
