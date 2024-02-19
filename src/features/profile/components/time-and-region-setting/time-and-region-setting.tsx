import { useToggle } from '@mantine/hooks';
import { Button, Card, Form } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { DescriptionBlock } from '@components/description-block';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetProfile } from '../../api/getProfile';
import { useGetUserMeta } from '../../api/getUserMeta';
import { useUpdateProfile } from '../../api/update-profile';

import { TimeAndRegionSettingRegionModal } from './time-and-region-setting-region-modal';
import { TimeAndRegionSettingTimeModal } from './time-and-region-setting-time-modal';

export const TimeAndRegionSetting = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { isLoading, data, isError } = useGetProfile();
  const { data: userMeta } = useGetUserMeta();

  const [openRegion, toggleRegion] = useToggle();
  const [openTime, toggleTime] = useToggle();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'profile.notification.setting.basicInfo.update'
      ) as string,
    });

    toggleRegion(false);
    toggleTime(false);
    form.resetFields();
  };

  const { submit, isLoading: isLoadingUpdateProfile } =
    useUpdateProfile({
      onSuccess,
    });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit(values);
  };

  return (
    <FallbackError isError={isError}>
      <Card
        loading={isLoading}
        title={
          <IntlMessage id="profile.setting.basicInfo.time.title" />
        }
      >
        <DescriptionBlock
          title={
            <IntlMessage id="profile.setting.basicInfo.time.timeZone" />
          }
          value={data?.time_zone}
          extra={
            <Button
              type="link"
              onClick={() => toggleRegion()}
            >
              <IntlMessage id="profile.setting.basicInfo.edit" />
            </Button>
          }
        />
        <DescriptionBlock
          title={
            <IntlMessage id="profile.setting.basicInfo.time.dateTime" />
          }
          value={dayjs().format(data?.datetime_format)}
          extra={
            <Button
              type="link"
              onClick={() => toggleTime()}
            >
              <IntlMessage id="profile.setting.basicInfo.edit" />
            </Button>
          }
        />
      </Card>
      <TimeAndRegionSettingRegionModal
        form={form}
        data={data}
        userMeta={userMeta}
        open={openRegion}
        isLoading={isLoadingUpdateProfile}
        onSubmit={onSubmit}
        onClose={toggleRegion}
      />
      <TimeAndRegionSettingTimeModal
        form={form}
        data={data}
        userMeta={userMeta}
        open={openTime}
        isLoading={isLoadingUpdateProfile}
        onSubmit={onSubmit}
        onClose={toggleTime}
      />
    </FallbackError>
  );
};
