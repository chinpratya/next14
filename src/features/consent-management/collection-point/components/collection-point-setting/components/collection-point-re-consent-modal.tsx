import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useReCollectionPointConsent } from '../../../api/re-collection-point-consent';

export type CollectionPointReConsentModalProps = {
  open: boolean;
  onClose: () => void;
  collectionPointId: string;
};

export const CollectionPointReConsentModal = ({
  open,
  onClose,
  collectionPointId,
}: CollectionPointReConsentModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const { submit, isLoading } =
    useReCollectionPointConsent({
      onSuccess: () => {
        onClose();
        showNotification({
          type: 'success',
          message: t(
            'consentManagement.notification.collectionPoint.setting.send'
          ) as string,
        });
      },
    });

  return (
    <Modal
      title={
        <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.header" />
      }
      open={open}
      onCancel={onClose}
      width={600}
      okText={
        <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.send" />
      }
      onOk={() => submit(collectionPointId)}
      okButtonProps={{
        loading: isLoading,
      }}
    >
      <Typography.Paragraph>
        <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.description" />
      </Typography.Paragraph>
    </Modal>
  );
};
