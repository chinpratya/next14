import {
  CheckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { useClipboard } from '@mantine/hooks';
import { Button, Card, Select, Typography } from 'antd';
import _ from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CodePreview } from '@components/code-preview';
import { Flex } from '@components/flex';
import { Modal } from '@components/modal';

import { useListPolicyLanguage } from '../../api/list-policy-language';

export type PolicyGetScriptProps = {
  open: boolean;
  onCancel: () => void;
  policyId: string;
};

export const PolicyGetScript = ({
  open,
  onCancel,
  policyId,
}: PolicyGetScriptProps) => {
  const clipboard = useClipboard();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);
  const [scriptLanguage, setScriptLanguage] = useState<
    string | null
  >(null);

  const language = useListPolicyLanguage(policyId);

  const languageOptions = language?.data?.data?.map(
    (language) => ({
      label: language.languageName,
      value: language.languageId,
    })
  );

  useEffect(() => {
    if (!scriptLanguage && languageOptions) {
      setScriptLanguage(
        _.get(languageOptions, '0.value', '')
      );
    }
  }, [languageOptions, scriptLanguage]);

  const url = `https://api.onefence.co/onefence-policy-and-notice-management/policyNotices/${policyId}/public?lang=${scriptLanguage}`;
  const code = `<iframe 
  src='${url}'
  width='100%'
  height='100vh'
  title='onefence'
></iframe>`;

  return (
    <Modal
      title="รับสคริปต์"
      open={open}
      onCancel={onCancel}
      width={1050}
      footer={false}
    >
      <Card title="วิธีการใช้งาน">
        <ol
          className={css`
            color: #72849a;
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          <li>
            ไปหน้าเว็บไซต์หลักของท่าน
            จากนั้นเตรียมพื้นที่เพื่อวางไอเฟรม (iframe)
          </li>
          <li>สร้างแท็กไอเฟรมบนพื้นที่ที่เตรียมเอาไว้</li>
          <li>คัดลอกลิงค์ด้านล่างจากหน้านี้</li>
          <li>
            ให้ท่านกำหนด Source (src) ในเเท็กไอเฟรม
            และนำลิงค์ที่คัดลอกไว้ไปวางบน Source
            เพื่อให้ไอเฟรมแสดงผลนโยบายของท่าน
          </li>
          <li>
            กำหนดความสูง height=&quot;100vh&quot;
            (สูงเต็มหน้าจอ) และความกว้าง
            width=&quot;100%&quot; (กว้างเต็มหน้าจอ)
            ให้อยู่ในขนาดที่ท่านเตรียมพื่นที่เอาไว้
          </li>
          <li>
            ไปหน้าเว็บไซต์หลักของท่าน
            จากนั้นเตรียมพื้นที่เพื่อวางไอเฟรม (iframe)
          </li>
        </ol>
      </Card>
      <Flex
        alignItems="center"
        justifyContent="end"
        className="mb-3"
      >
        <Typography className="mr-1">
          เลือกภาษา :{' '}
        </Typography>
        <Select
          value={scriptLanguage}
          style={{ width: 150 }}
          options={languageOptions}
          onChange={(language) =>
            setScriptLanguage(language)
          }
        />
      </Flex>
      <Card
        title="ลิงค์นโยบายความเป็นส่วนตัว"
        extra={
          <Button
            onClick={() => {
              clipboard.copy(url);
              setCopiedUrl(true);

              setTimeout(() => {
                setCopiedUrl(false);
              }, 2000);
            }}
          >
            คัดลอก{' '}
            {copiedUrl ? (
              <CheckOutlined className="text-success" />
            ) : (
              <CopyOutlined />
            )}
          </Button>
        }
      >
        <Link href={url} target="_blank">
          {url}
        </Link>
      </Card>

      <Card
        title="โค้ดตัวอย่างไอเฟรม"
        extra={
          <Button
            onClick={() => {
              clipboard.copy(code);
              setCopiedIframe(true);

              setTimeout(() => {
                setCopiedIframe(false);
              }, 2000);
            }}
          >
            คัดลอก{' '}
            {copiedIframe ? (
              <CheckOutlined className="text-success" />
            ) : (
              <CopyOutlined />
            )}
          </Button>
        }
      >
        <CodePreview disabledCopy={true} code={code} />
      </Card>
    </Modal>
  );
};
