import { Form, FormInstance, Input, Modal } from 'antd';
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

export const ProfileInfoManageNameModal = ({
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
        <IntlMessage id="profile.setting.basicInfo.name.edit" />
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
          name="first_name"
          label={
            <IntlMessage id="profile.setting.basicInfo.firstName" />
          }
          rules={[
            validation.required(
              t(
                'profile.setting.basicInfo.firstNameRequired'
              )
            ),
          ]}
        >
          <Input
            placeholder={
              t(
                'profile.setting.basicInfo.firstNamePlaceholder'
              ) as string
            }
          />
        </Form.Item>
        <Form.Item
          name="last_name"
          label={
            <IntlMessage id="profile.setting.basicInfo.lastName" />
          }
          rules={[
            validation.required(
              t(
                'profile.setting.basicInfo.lastNameRequired'
              )
            ),
          ]}
        >
          <Input
            placeholder={
              t(
                'profile.setting.basicInfo.lastNamePlaceholder'
              ) as string
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
