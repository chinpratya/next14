import { notification } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';

export const Notifications = () => {
  const { notifications, dismissNotification } =
    useNotifications();

  const { t } = useTranslation();

  useEffect(() => {
    if (notifications.length > 0) {
      const lastNotification =
        notifications[notifications.length - 1];

      const message = lastNotification.title
        ? t(lastNotification.title)
        : t(lastNotification.type);

      const description = lastNotification.message
        ? t(lastNotification.message)
        : null;

      notification.open({
        message,
        description,
        type: lastNotification.type,
        placement: 'bottomLeft',
      });
      dismissNotification(lastNotification.id);
    }
  }, [dismissNotification, notifications, t]);

  return null;
};
