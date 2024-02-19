import {
  Form,
  FormInstance,
  Input,
  Modal,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { Profile } from '../../types';

type ProfileInfoManageNameModalProps = {
  data?: Profile;
  form: FormInstance;
  open: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export const ProfileInfoManageEmailModal = ({
  data,
  form,
  open,
  isLoading,
  onSubmit,
  onClose,
}: ProfileInfoManageNameModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (data) form.setFieldsValue(data);
    if (!open) form.resetFields();
  }, [data, form, open]);

  return (
    <Modal
      title={
        <IntlMessage id="profile.setting.basicInfo.email.edit" />
      }
      okText={
        <IntlMessage id="profile.setting.basicInfo.save" />
      }
      open={open}
      onCancel={onClose}
      onOk={onSubmit}
      okButtonProps={{
        loading: isLoading,
      }}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="email"
          label={
            <IntlMessage id="profile.setting.basicInfo.emailNew" />
          }
          rules={[
            validation.required(
              t(
                'profile.setting.basicInfo.emailNewRequired'
              )
            ),
            validation.email(),
          ]}
        >
          <Input
            placeholder={
              t(
                'profile.setting.basicInfo.emailNewPlaceholder'
              ) as string
            }
          />
        </Form.Item>
        <Form.Item
          name="email_password"
          label={
            <IntlMessage id="profile.setting.basicInfo.password" />
          }
          className="mb-0"
          rules={[
            validation.required(
              t(
                'profile.setting.basicInfo.passwordRequired'
              )
            ),
          ]}
        >
          <Input.Password
            placeholder={
              t(
                'profile.setting.basicInfo.passwordPlaceholder'
              ) as string
            }
          />
        </Form.Item>
        <Typography className="mt-3">
          <IntlMessage id="profile.setting.basicInfo.password.desc" />
        </Typography>
      </Form>
    </Modal>
  );
};
