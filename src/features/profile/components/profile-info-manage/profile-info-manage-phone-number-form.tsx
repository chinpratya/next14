import { Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { SelectPhonePrefix } from '@components/select-phone-prefix';
import { IntlMessage } from '@utilComponents/intl-message';

import { Profile } from '../../types';

export type ProfileInfoManagePhoneNumberFormProps = {
  form: FormInstance;
  data?: Profile;
};

export const ProfileInfoManagePhoneNumberForm = ({
  form,
  data,
}: ProfileInfoManagePhoneNumberFormProps) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label={
          <IntlMessage id="profile.setting.basicInfo.telCurrent" />
        }
      >
        <Input
          addonBefore={
            data?.phone_prefix ??
            `+${data?.phone_prefix?.replace('+', '')}`
          }
          defaultValue={data?.phone_number}
          readOnly
        />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="profile.setting.basicInfo.telNew" />
        }
        name="phone_number"
        rules={[
          validation.required(
            t('profile.setting.basicInfo.telNewRequired')
          ),
          validation.phone(),
        ]}
      >
        <Input
          addonBefore={
            <Form.Item
              name="phone_prefix"
              noStyle
              rules={[
                validation.required(
                  'Please select phone prefix'
                ),
              ]}
            >
              <SelectPhonePrefix style={{ width: 100 }} />
            </Form.Item>
          }
          placeholder={
            t(
              'profile.setting.basicInfo.telNewPlaceholder'
            ) as string
          }
        />
      </Form.Item>
    </Form>
  );
};
