import {
  CheckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useClipboard } from '@mantine/hooks';
import { Button, Card, Select, Typography } from 'antd';
import { useState } from 'react';

import { SUCCESS_COLOR } from '@/config/color';
import { tokens } from '@/lang';
import { CodePreview } from '@components/code-preview';
import { Flex } from '@components/flex';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

const BANNER_LANGUAGES = [
  {
    label: <IntlMessage id={tokens.common.auto} />,
    value: 'auto',
  },
  {
    label: (
      <IntlMessage id={tokens.common.languagesCode.th} />
    ),
    value: 'th',
  },
  {
    label: (
      <IntlMessage id={tokens.common.languagesCode.en} />
    ),
    value: 'en',
  },
];

export type BannerScriptModalProps = {
  domainId: string;
  open?: boolean;
  onClose?: () => void;
};

export const BannerScriptModal = ({
  domainId,
  open,
  onClose,
}: BannerScriptModalProps) => {
  const [language, setLanguage] =
    useState<string>('auto');

  const clientScript =
    '<script src="https://cdn.onefence.co/onefence.banner.consent.min.js" type="text/javascript"></script>\n' +
    `<script src="https://api.onefence.co/cookiev2/js?key=${domainId}&lang=${language}"></script>`;

  const clipboard = useClipboard({ timeout: 1000 });

  const onLanguageChange = (currentLanguage: string) => {
    setLanguage(currentLanguage);
  };

  return (
    <Modal
      open={open}
      width={800}
      title={
        <IntlMessage
          id={
            tokens.cookieManagement.cookieBanner
              .scriptModal.title
          }
        />
      }
      footer={null}
      onCancel={onClose}
    >
      <Card
        title={
          <IntlMessage
            id={
              tokens.cookieManagement.cookieBanner
                .scriptModal.howToUseTitle
            }
          />
        }
      >
        <IntlMessage
          id={
            tokens.cookieManagement.cookieBanner
              .scriptModal.howToUseDescription
          }
        />
      </Card>
      <Card
        title={<IntlMessage id={tokens.common.script} />}
        extra={
          <Flex
            justifyContent="center"
            alignItems="center"
          >
            <Flex alignItems="center" className="mr-2">
              <Typography.Text className="mr-2">
                <IntlMessage
                  id={tokens.common.language}
                />{' '}
                :
              </Typography.Text>
              <Select
                style={{ width: 150 }}
                options={BANNER_LANGUAGES}
                value={language}
                onChange={onLanguageChange}
              />
            </Flex>
            <Button
              onClick={() => clipboard.copy(clientScript)}
            >
              <IntlMessage id={tokens.common.copy} />{' '}
              {clipboard.copied ? (
                <CheckOutlined
                  style={{ color: SUCCESS_COLOR }}
                />
              ) : (
                <CopyOutlined />
              )}
            </Button>
          </Flex>
        }
      >
        <CodePreview code={clientScript} disabledCopy />
      </Card>
    </Modal>
  );
};
