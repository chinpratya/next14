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

export type WebFormGetScriptModalLinkProps = {
  webformId: string;
};

export const WebformGetScriptModalLink = ({
  webformId,
}: WebFormGetScriptModalLinkProps) => {
  const clipboard = useClipboard();

  const code = `https://portal.beta.onefence.co/data-breach/web-form/${webformId}`;

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <Card.Meta
            title={
              <IntlMessage id="dsarAutomation.setting.webForm.getScript.link.title" />
            }
            description={
              <IntlMessage id="dsarAutomation.setting.webForm.getScript.link.desc" />
            }
          />
        </Col>
        <Col span={7}>
          <Flex justifyContent="end">
            <Button
              className="mr-2"
              onClick={() => window.open(code, '_blank')}
            >
              <IntlMessage id="dsarAutomation.setting.webForm.getScript.openLink" />{' '}
              <MdOutlineOpenInNew className="ml-2" />
            </Button>
            <Button onClick={() => clipboard.copy(code)}>
              <IntlMessage id="dsarAutomation.setting.webForm.getScript.copy" />{' '}
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
