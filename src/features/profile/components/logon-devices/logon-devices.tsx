import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useSetState } from '@mantine/hooks';
import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetSessions } from '../../api/getSessions';
import { useLogoutSession } from '../../api/logoutSession';
import { Session } from '../../types';

import { DevicesItems } from './devices-items';

export const LogonDevices = () => {
  const [t] = useTranslation();
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } = useGetSessions();

  const onLogoutSuccess = () => {
    showNotification({
      type: 'success',
      message: `Successfully logged out from device`,
    });
    onToggleDeleteState();
  };

  const logout = useLogoutSession({
    onSuccess: onLogoutSuccess,
  });

  const [deleteState, setDeleteState] = useSetState({
    open: false,
    device: null as Session | null,
  });

  const onToggleDeleteState = (device?: Session) => {
    setDeleteState({
      open: !deleteState.open,
      device: device ?? null,
    });
  };

  return (
    <>
      <FallbackError isError={isError}>
        <Card
          title={
            <IntlMessage id="profile.setting.basicInfo.session.title" />
          }
          loading={isLoading}
        >
          <Typography>
            <IntlMessage id="profile.setting.basicInfo.session.desc" />
          </Typography>
          <DevicesItems
            devices={data?.data ?? []}
            onLogout={onToggleDeleteState}
          />
        </Card>
      </FallbackError>
      <DeleteModal
        forceRender
        open={deleteState.open}
        icon={
          <ExclamationCircleOutlined className="text-danger" />
        }
        title={t('profile.logout.title', {
          device: deleteState.device?.device ?? '',
        })}
        content={t('profile.logout.content', {
          device: deleteState.device?.device ?? '',
        })}
        hasIdentifier={false}
        width={500}
        onDelete={() =>
          logout.submit(
            deleteState.device?.session_id ?? ''
          )
        }
        onCancel={() => onToggleDeleteState()}
        loading={logout.isLoading}
        okText="ออกจากระบบ"
      />
    </>
  );
};
