import { Tabs } from 'antd';

import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { PreferenceCentersGetScriptConsentLink } from '../preference-centers-get-script-consent-link';

export type PreferenceCentersGetScriptProps = {
  open: boolean;
  onCancel: () => void;
  preferenceId: string;
};

export const PreferenceCentersGetScript = ({
  open,
  onCancel,
  preferenceId,
}: PreferenceCentersGetScriptProps) => {
  return (
    <Modal
      title={
        <IntlMessage id="consentManagement.preferenceCenters.table.getScript.title" />
      }
      open={open}
      onCancel={onCancel}
      width={1050}
      footer={false}
    >
      <Tabs
        items={[
          {
            label: (
              <IntlMessage id="consentManagement.preferenceCenters.table.getScript.consentLink.title" />
            ),
            key: 'consent-link',
            children: (
              <PreferenceCentersGetScriptConsentLink
                preferenceId={preferenceId}
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};
