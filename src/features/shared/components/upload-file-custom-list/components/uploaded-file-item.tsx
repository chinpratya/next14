import { DeleteOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Card, Row, Typography } from 'antd';
import { saveAs } from 'file-saver';
import Image from 'next/image';

import { tokens } from '@/lang';
import { DropdownTable } from '@components/dropdown-table';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteFile } from '../../../api/delete-file';

const renderNameFile = (fileName: string) => {
  if (fileName.length > 10) {
    return `${fileName.slice(0, 5)}...${fileName.slice(
      fileName.length - 7,
      fileName.length
    )}`;
  }
  return fileName;
};

export type UploadedFileItemProps = {
  module: string;
  group: string;
  file: string;
  width?: number;
};

export const UploadedFileItem = ({
  file,
  module,
  group,
  width = 200,
}: UploadedFileItemProps) => {
  const deleteFile = useDeleteFile({
    module,
    group,
    env: 'public',
  });

  return (
    <Card
      key={file}
      className={css`
        width: ${width}px !important;
        margin: 0 10px 0 0 !important;
      `}
      actions={[
        <Typography.Link
          key={'file.name'}
          onClick={() => {
            saveAs(
              file,
              `${file.split('/').reverse()[0]}`
            );
          }}
        >
          <IntlMessage id={tokens.common.download} />
        </Typography.Link>,
      ]}
    >
      <Card className="text-center">
        <Image
          src="/img/File_Type.png"
          alt="imageFile"
          width={35}
          height={40}
        />
      </Card>
      <Row justify="space-between" align="middle">
        <Typography.Text>
          {renderNameFile(file.split('/').reverse()[0])}
        </Typography.Text>
        <div
          style={{
            position: 'relative',
            left: '5px',
          }}
        >
          <DropdownTable
            items={[
              {
                label: (
                  <IntlMessage
                    id={tokens.common.delete}
                  />
                ),
                key: 'delete',
                icon: <DeleteOutlined />,
                onClick: () => {
                  deleteFile.submit(
                    file.split('/').reverse()[0]
                  );
                },
              },
            ]}
          />
        </div>
      </Row>
    </Card>
  );
};
