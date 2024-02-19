import { UploadOutlined } from '@ant-design/icons';
import { Typography, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { IntlMessage } from '@/components/util-components/intl-message';

type IndicesLogForwardingCertUploadProps = {
  name: string;
  onUpload: (name: string, file: UploadFile) => void;
};

const typeFile = [
  '.pem',
  '.crt',
  '.ca-bundle',
  '.p7b',
  '.p7s',
  '.der',
  '.cer',
  '.pfx',
  '.p12',
];

export const IndicesLogForwardingCertUpload = ({
  name,
  onUpload,
}: IndicesLogForwardingCertUploadProps) => {
  return (
    <Upload
      showUploadList={false}
      onChange={(e) => onUpload(name, e.file)}
      accept={typeFile.join(',')}
    >
      <Typography.Link>
        <UploadOutlined />{' '}
        <IntlMessage id="logManagement.ClickToUpload" />
      </Typography.Link>
    </Upload>
  );
};
