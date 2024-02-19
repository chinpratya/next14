import { DownloadOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Button, Card, Form, Input } from 'antd';

import { CodePreview } from '@/components/share-components/code-preview';
import { IntlMessage } from '@/components/util-components/intl-message';
import { CopyToClipboardIcon } from '@/features/shared';

import { IndiceDetail } from '../../types';

type IndicesInfoSettingProps = {
  indice: IndiceDetail;
  mode?: 'CLOUD' | 'ON-PREMISE';
  onExportPemFile: () => void;
};

export const IndicesInfoSetting = ({
  indice,
  mode,
  onExportPemFile,
}: IndicesInfoSettingProps) => {
  const [beat_port, syslog_port] = indice?.port;

  return (
    <Card
      title={
        <IntlMessage id="siem.indices.basicInfomation.setting" />
      }
    >
      <Form.Item
        name="hostname"
        label={
          <IntlMessage id="siem.indices.basicInfomation.host" />
        }
      >
        <Input
          suffix={
            <CopyToClipboardIcon
              text={indice?.hostname as string}
            />
          }
          disabled
        />
      </Form.Item>
      <Form.Item name="beat_port" label="Beat Port">
        <Input
          suffix={
            <CopyToClipboardIcon
              text={beat_port?.toString()}
            />
          }
          disabled
        />
      </Form.Item>
      <Form.Item name="syslog_port" label="Syslog Port">
        <Input
          suffix={
            <CopyToClipboardIcon
              text={syslog_port.toString()}
            />
          }
          disabled
        />
      </Form.Item>

      {mode === 'ON-PREMISE' ? (
        <Form.Item
          name="id"
          label={
            <IntlMessage id="logManagement.indices.token" />
          }
        >
          <Input
            suffix={
              <CopyToClipboardIcon text={indice.id} />
            }
            disabled
          />
        </Form.Item>
      ) : (
        <Form.Item
          name="certificate"
          className={css`
            padding-top: 16px;

            label {
              width: 100%;
              justify-content: space-between;
              align-items: end;
            }
          `}
          label={
            <Flex
              align="center"
              gap="md"
              justify="space-between"
              className="w-100"
            >
              <IntlMessage id="logManagement.indices.certificate" />
              <Button
                type="primary"
                ghost
                icon={<DownloadOutlined />}
                onClick={onExportPemFile}
                size="small"
              />
            </Flex>
          }
          // tooltip="The system will create Certification and Configuration provided after the data source has been successfully created"
          valuePropName="code"
        >
          <CodePreview language="bash" disabled />
        </Form.Item>
      )}
    </Card>
  );
};
