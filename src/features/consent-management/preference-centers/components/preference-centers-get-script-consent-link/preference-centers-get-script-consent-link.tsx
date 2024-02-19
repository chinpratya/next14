import {
  CheckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useClipboard } from '@mantine/hooks';
import { Button, Card, Col, Row } from 'antd';
import { MdOutlineOpenInNew } from 'react-icons/md';

import { CodePreview } from '@components/code-preview';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

export type PreferenceCentersGetScriptConsentLinkProps = {
  preferenceId: string;
};

export const PreferenceCentersGetScriptConsentLink = ({
  preferenceId,
}: PreferenceCentersGetScriptConsentLinkProps) => {
  const clipboard = useClipboard();

  const code = `https://portal.beta.onefence.co/consent-management/preference-centers/auth?preferenceCenterId=${preferenceId}`;

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <Card.Meta
            title={
              <IntlMessage id="consentManagement.preferenceCenters.table.getScript.consentLink.title" />
            }
            description={
              <IntlMessage id="consentManagement.preferenceCenters.table.getScript.consentLink.description" />
            }
          />
        </Col>
        <Col span={7}>
          <Flex justifyContent="end">
            <Button
              className="mr-2"
              onClick={() => window.open(code, '_blank')}
            >
              <IntlMessage id="consentManagement.preferenceCenters.table.getScript.consentLink.openLink" />{' '}
              <MdOutlineOpenInNew className="ml-2" />
            </Button>
            <Button onClick={() => clipboard.copy(code)}>
              <IntlMessage id="consentManagement.preferenceCenters.table.getScript.copy" />{' '}
              {clipboard.copied ? (
                <CheckOutlined className="text-success" />
              ) : (
                <CopyOutlined />
              )}
            </Button>
          </Flex>
        </Col>
        <Col span={24}>
          <CodePreview disabledCopy={true} code={code} />
        </Col>
      </Row>
    </Card>
  );
};
