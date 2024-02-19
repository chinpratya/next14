import {
  CheckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useClipboard } from '@mantine/hooks';
import { Button, Card } from 'antd';

import { CodePreview } from '@components/code-preview';
import { IntlMessage } from '@utilComponents/intl-message';

export type CollectionPointGetScriptAPIProps = {
  collectionPointId: string;
};

export const CollectionPointGetScriptAPI = ({
  collectionPointId,
}: CollectionPointGetScriptAPIProps) => {
  const clipboard = useClipboard();

  const url = `https://portal.beta.onefence.co/consent-management/collection-point/${collectionPointId}`;
  const code = `<iframe 
  src='${url}'
  width='100%'
  height='100vh'
  title='onefence'
></iframe>`;

  return (
    <Card
      title={
        <IntlMessage id="consentManagement.collectionPoint.table.getScript.api.title" />
      }
      extra={
        <Button onClick={() => clipboard.copy(code)}>
          <IntlMessage id="consentManagement.collectionPoint.table.getScript.copy" />{' '}
          {clipboard.copied ? (
            <CheckOutlined className="text-success" />
          ) : (
            <CopyOutlined />
          )}
        </Button>
      }
    >
      <CodePreview disabledCopy={true} code={code} />
    </Card>
  );
};
