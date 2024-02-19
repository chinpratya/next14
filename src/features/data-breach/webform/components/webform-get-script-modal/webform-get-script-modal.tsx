import { Typography, Tabs } from 'antd';

import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { WebForm } from '../../types';

import { WebformGetScriptModalCodeWeb } from './webform-get-script-modal-code-web';
import { WebformGetScriptModalLink } from './webform-get-script-modal-link';

export type WebFormGetScriptModalProps = {
  open: boolean;
  onClose: () => void;
  webform: WebForm;
};

export const WebformGetScriptModal = ({
  open,
  onClose,
  webform,
}: WebFormGetScriptModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <Typography.Title level={4}>
          <IntlMessage id="dsarAutomation.setting.webForm.getScript.title" />{' '}
          <Typography.Text style={{ color: '#899197' }}>
            {webform?.name ?? ''}
          </Typography.Text>
        </Typography.Title>
      }
      width={900}
      onOk={onClose}
    >
      <Tabs
        items={[
          {
            key: 'link',
            label: (
              <IntlMessage id="dsarAutomation.setting.webForm.getScript.link" />
            ),
            children: (
              <WebformGetScriptModalLink
                webformId={webform?.webformID}
              />
            ),
          },
          {
            key: 'web',
            label: (
              <IntlMessage id="dsarAutomation.setting.webForm.getScript.web" />
            ),
            children: (
              <WebformGetScriptModalCodeWeb
                webformId={webform?.webformID}
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};
