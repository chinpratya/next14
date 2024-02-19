import { css } from '@emotion/css';
import { useDebouncedState } from '@mantine/hooks';
import {
  Card,
  Form,
  Select,
  Tabs,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { produce } from 'immer';
import { useEffect, useState } from 'react';

import { tokens } from '@/lang';
import { InnerAppLayout } from '@/layouts';
import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { CookieCategory, CookieItem } from '../../types';

import { CookiesEditForm } from './components/cookies-edit-form';
import { CookiesMenuList } from './components/cookies-menu-list';

export type CookiesEditProps = {
  cookies?: CookieItem[];
  categories?: CookieCategory[];
  setCookies?: (cookies: CookieItem[]) => void;
};

const getDurationDisplay = (expiry: string): string => {
  return dayjs().from(dayjs(expiry), true);
};

export const CookiesEdit = ({
  cookies = [],
  categories = [],
  setCookies,
}: CookiesEditProps) => {
  const { showValidateFailedNotification } =
    useNotifications();

  const [debouncedCookies, setDebouncedCookies] =
    useDebouncedState<CookieItem[] | null>(null, 1000);
  const [language, setLanguage] = useState<string>('th');
  const [currentCookieKey, setCurrentCookieKey] =
    useState<string>('');

  const [form] = Form.useForm();

  const handlerChangeCookie = async (
    cookieKey: string
  ) => {
    try {
      await form.validateFields();
      const cookieName = cookieKey.split('|')[0];
      const cookieData = cookies.find(
        (cookie) => cookie.name === cookieName
      );
      form.setFieldsValue({
        ...cookieData,
        durationDisplay: getDurationDisplay(
          cookieData?.Expiry ?? ''
        ),
      });
      setCurrentCookieKey(cookieKey);
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  const onChangeLanguage = (language: string) => {
    setLanguage(language);
  };

  const onValuesChange = (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>
  ) => {
    const cookieName = currentCookieKey.split('|')[0];
    const cookieIndex = cookies.findIndex(
      (cookie) => cookie.name === cookieName
    );
    const newCookies = produce(cookies, (draft) => {
      draft[cookieIndex] = {
        ...draft[cookieIndex],
        ...allValues,
        description: {
          ...draft[cookieIndex].description,
          ...(allValues?.description as Record<
            string,
            string
          >),
        },
      };
    });

    setDebouncedCookies(newCookies);
  };

  useEffect(() => {
    if (cookies.length > 0 && !debouncedCookies) {
      setDebouncedCookies(cookies);
      form.setFieldsValue({
        ...cookies[0],
        durationDisplay: getDurationDisplay(
          cookies[0].Expiry ?? ''
        ),
      });
      setCurrentCookieKey(
        `${cookies[0].name}|${cookies[0].domain}`
      );
    }
  }, [
    debouncedCookies,
    cookies,
    form,
    setDebouncedCookies,
  ]);

  useEffect(() => {
    if (debouncedCookies) {
      setCookies?.(debouncedCookies);
    }
  }, [debouncedCookies, setCookies]);

  return (
    <Card
      className={css`
        .ant-card-body {
          padding: 0;

          .ant-menu-inline {
            border-right: 0;
          }

          .ant-menu-item {
            padding: 0 8px 0 16px !important;

            .ant-typography {
              width: 180px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .cookie-category-ellipsis {
              display: none;
            }
          }

          .ant-menu-item-selected {
            .ant-typography {
              color: #3e79f7;
            }

            .cookie-category-badge {
              display: none;
            }

            .cookie-category-ellipsis {
              display: block;
            }
          }

          .inner-app-layout > .main-content {
            min-height: calc(100vh - 130px - 80px * 2);
          }
        }
      `}
    >
      <InnerAppLayout
        sideContentWidth={365}
        sideContent={
          <div className="w-100 pt-2 border-right">
            <CookiesMenuList
              currentCookie={currentCookieKey}
              onChange={handlerChangeCookie}
              cookies={cookies}
              categories={categories}
            />
          </div>
        }
        mainContent={
          <div className="w-100">
            <Flex
              alignItems="center"
              justifyContent="end"
            >
              <Typography.Text className="mr-2">
                <IntlMessage
                  id={tokens.common.language}
                />
                :
              </Typography.Text>
              <Select
                className="w-25"
                value={language}
                onChange={onChangeLanguage}
                options={[
                  {
                    label: 'ภาษาไทย',
                    value: 'th',
                  },
                  {
                    label: 'English',
                    value: 'en',
                  },
                ]}
              />
            </Flex>
            <Tabs
              items={[
                {
                  key: 'general',
                  label: (
                    <IntlMessage
                      id={tokens.common.general}
                    />
                  ),
                  children: (
                    <Form
                      form={form}
                      layout="vertical"
                      className="w-75"
                      onValuesChange={onValuesChange}
                    >
                      <CookiesEditForm
                        language={language}
                        categories={categories}
                      />
                    </Form>
                  ),
                },
              ]}
            />
          </div>
        }
      />
    </Card>
  );
};
