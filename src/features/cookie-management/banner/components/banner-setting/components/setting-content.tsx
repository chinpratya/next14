import {
  Divider,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';
import Link from 'next/link';
import { useContext } from 'react';

import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { BannerContext } from '../../banner-context-provider';

export type SettingContentProps = {
  isPerfStyle?: boolean;
};

export const SettingContent = ({
  isPerfStyle,
}: SettingContentProps) => {
  const bannerContext = useContext(BannerContext);
  const currentLanguage =
    bannerContext?.currentLanguage ?? 'th';

  const descriptionName = isPerfStyle
    ? 'perf_description'
    : 'description';

  const privacyPolicyUrlName = isPerfStyle
    ? 'perf_privacy_policy_link'
    : 'privacy_policy_link';

  const cookieStatementName = isPerfStyle
    ? 'perf_cookie_statement'
    : 'cookie_statement';

  const cookiePolicyUrlName = isPerfStyle
    ? 'perf_cookie_policy_link'
    : 'cookie_policy_link';

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="end"
        className="mb-2"
      >
        <Typography.Text className="mr-2">
          <IntlMessage id={tokens.common.language} /> :
        </Typography.Text>
        <Select
          style={{ width: 120 }}
          value={currentLanguage}
          onChange={
            bannerContext?.onChangeCurrentLanguage
          }
          options={[
            { label: 'ENGLISH', value: 'en' },
            { label: 'ภาษาไทย', value: 'th' },
          ]}
        />
      </Flex>
      <Form.Item
        label={<IntlMessage id={tokens.common.content} />}
        name={['text', currentLanguage, descriptionName]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Divider />
      {!isPerfStyle && (
        <>
          <Form.Item
            label={
              <IntlMessage
                id={
                  tokens.cookieManagement.cookieBanner
                    .content.policyName
                }
              />
            }
            name={[
              'text',
              currentLanguage,
              'privacy_statement',
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={
              <IntlMessage
                id={
                  tokens.cookieManagement.cookieBanner
                    .content.policyUrl
                }
              />
            }
            className="mb-2"
            name={[
              'text',
              currentLanguage,
              privacyPolicyUrlName,
            ]}
          >
            <Input />
          </Form.Item>
          <Typography.Text className="d-block text-right">
            <IntlMessage
              id={
                tokens.cookieManagement.cookieBanner
                  .content.policyRecommendation
              }
            />{' '}
            <Link
              href="/apps/datafence/policy-management/policy"
              target="_blank"
            >
              <IntlMessage id={tokens.common.click} />
            </Link>
          </Typography.Text>
          <Divider />
          <Form.Item
            label={
              <IntlMessage
                id={
                  tokens.cookieManagement.cookieBanner
                    .content.policyCookieName
                }
              />
            }
            name={[
              'text',
              currentLanguage,
              cookieStatementName,
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <IntlMessage
                id={
                  tokens.cookieManagement.cookieBanner
                    .content.policyCookieUrl
                }
              />
            }
            name={[
              'text',
              currentLanguage,
              cookiePolicyUrlName,
            ]}
          >
            <Input />
          </Form.Item>
        </>
      )}
    </>
  );
};
