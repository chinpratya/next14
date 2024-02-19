import { Card, Button } from 'antd';
import QRCode from 'qrcode.react';
import { IntlMessage } from '@utilComponents/intl-message';
import { DownloadOutlined } from '@ant-design/icons';
import { Flex } from '@/components/share-components/flex';
import { css } from '@emotion/css';

type WebformGetScriptModalQrcodeProps = {
  webformId: string;
};

export const WebformGetScriptModalQrcode = ({
  webformId,
}: WebformGetScriptModalQrcodeProps) => {
  const downloadQRCode = () => {
    const qrCodeCanvas = document.getElementById(
      'qrCodeEl'
    ) as HTMLCanvasElement;
    if (qrCodeCanvas) {
      const qrCodeURL = qrCodeCanvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      let aEl = document.createElement('a');
      aEl.href = qrCodeURL;
      aEl.download = 'QR_Code.png';
      document.body.appendChild(aEl);
      aEl.click();
      document.body.removeChild(aEl);
    }
  };
  return (
    <Card
      title={
        <IntlMessage id="dsarAutomation.setting.webForm.getScript.qrcode" />
      }
      extra={
        <Button
          icon={<DownloadOutlined />}
          onClick={() => downloadQRCode()}
        >
          <IntlMessage id="dsarAutomation.setting.webForm.getScript.qrcode.download" />
        </Button>
      }
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        className={css`
          background: #2b2b2b;
          padding: 40px 0;
        `}
      >
        <QRCode
          id="qrCodeEl"
          size={200}
          value={`https://portal.beta.onefence.co/dsar-automation/web-form/${webformId}`}
        />
      </Flex>
    </Card>
  );
};
