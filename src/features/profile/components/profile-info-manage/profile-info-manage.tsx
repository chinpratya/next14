import { useToggle } from '@mantine/hooks';
import { Button, Card, Form } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { BrandHero } from '@components/brand-hero';
import { DescriptionBlock } from '@components/description-block';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useResendEmailVerify } from '../../../auth/api/resent-email-verify';
import { useGetProfile } from '../../api/getProfile';
import { useUpdateProfile } from '../../api/update-profile';
import { ProfileInfoSubmitPayload } from '../../types';

import { ProfileInfoManageEmailModal } from './profile-info-manage-email-modal';
import { ProfileInfoManageNameModal } from './profile-info-manage-name-modal';
import { ProfileInfoManagePhoneNumberModal } from './profile-info-manage-phone-number-modal';

export const ProfileInfoManage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const [openName, toggleName] = useToggle();
  const [openEmail, toggleEmail] = useToggle();
  const [openPhoneNumber, togglePhoneNumber] =
    useToggle();

  const { isLoading, data, isError } = useGetProfile();
  const resendVerify = useResendEmailVerify({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'profile.notification.setting.basicInfo.email.verify'
        ) as string,
      });
      toggleEmail(false);
      form.resetFields();
    },
  });

  const onSuccess = () => {
    if (openEmail && data) {
      resendVerify.submit({
        user_id: data.id,
        organization_short_name: 'test',
        lifespan: 10,
      });
      return;
    }

    showNotification({
      type: 'success',
      message: t(
        'profile.notification.setting.basicInfo.update'
      ) as string,
    });
    toggleName(false);
    togglePhoneNumber(false);
    form.resetFields();
  };

  const { submit, isLoading: isLoadingUpdateProfile } =
    useUpdateProfile({
      onSuccess,
    });

  const onSubmit = async (
    payload?: ProfileInfoSubmitPayload
  ) => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit({ ...(payload ?? {}), ...values });
  };

  return (
    <FallbackError isError={isError}>
      <Card loading={isLoading}>
        <BrandHero
          title={data?.username}
          description={
            <IntlMessage id="profile.setting.basicInfo.description" />
          }
        />
        <DescriptionBlock
          title={
            <IntlMessage id="profile.setting.basicInfo.name" />
          }
          value={`${data?.prefix_name} ${data?.first_name} ${data?.first_name}`}
          extra={
            <Button
              type="link"
              onClick={() => toggleName()}
            >
              <IntlMessage id="profile.setting.basicInfo.edit" />
            </Button>
          }
        />
        <DescriptionBlock
          title={
            <IntlMessage id="profile.setting.basicInfo.email" />
          }
          value={data?.email}
          extra={
            <Button
              type="link"
              onClick={() => toggleEmail()}
            >
              <IntlMessage id="profile.setting.basicInfo.edit" />
            </Button>
          }
        />
        <DescriptionBlock
          title={
            <IntlMessage id="profile.setting.basicInfo.tel" />
          }
          value={`${
            data?.phone_prefix ??
            `+ ${data?.phone_prefix}`
          } ${data?.phone_number?.replace('+', '')}`}
          extra={
            <Button
              type="link"
              onClick={() => togglePhoneNumber()}
            >
              <IntlMessage id="profile.setting.basicInfo.edit" />
            </Button>
          }
        />
        <DescriptionBlock
          title={
            <IntlMessage id="profile.setting.basicInfo.password" />
          }
          value="********"
          extra={
            <Button
              type="link"
              onClick={() => {
                router.push(
                  `/admin/business-setting/set-password`
                );
              }}
            >
              <IntlMessage id="profile.setting.basicInfo.edit" />
            </Button>
          }
        />
        <DescriptionBlock
          title={
            <IntlMessage id="profile.setting.basicInfo.twoStep" />
          }
          value={
            <Button type="link" className="p-0">
              <IntlMessage id="profile.setting.basicInfo.activate" />
            </Button>
          }
          extra
        />
      </Card>

      <ProfileInfoManageNameModal
        data={data}
        open={openName}
        form={form}
        isLoading={isLoadingUpdateProfile}
        onSubmit={() => onSubmit()}
        onClose={toggleName}
      />
      <ProfileInfoManageEmailModal
        data={data}
        open={openEmail}
        form={form}
        isLoading={isLoadingUpdateProfile}
        onSubmit={() => onSubmit()}
        onClose={toggleEmail}
      />
      <ProfileInfoManagePhoneNumberModal
        data={data}
        open={openPhoneNumber}
        form={form}
        isLoading={isLoadingUpdateProfile}
        onSubmit={onSubmit}
        onClose={togglePhoneNumber}
      />
    </FallbackError>
  );
};
