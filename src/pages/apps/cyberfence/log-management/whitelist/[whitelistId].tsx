import { css } from '@emotion/css';
import {
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Skeleton,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';
import {
  useGetWhitelist,
  whitelistType,
} from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const { lm, core } = logManagementModules;

const WhitelistDetailPage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const router = useRouter();

  const whitelistId = router.query.whitelistId as string;

  const { data, isError, isLoading } = useGetWhitelist({
    whitelistId,
  });

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="logManagement.whitelist.whitelistDefineLogType" />
        }
        subtitle={data?.target ?? ''}
        onBack={router.back}
      />

      <Row gutter={[16, 16]}>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="logManagement.whitelist.basicInfomation" />
            }
          >
            {isLoading ? (
              <Skeleton paragraph={{ rows: 5 }} />
            ) : (
              <Form
                layout="vertical"
                form={form}
                disabled
                initialValues={{
                  ...data,
                  type: whitelistType[
                    data?.type as string
                  ],
                }}
                className={css`
                  .ant-input-disabled {
                    color: ${CYBER_DISABLED_TEXT_COLOR};
                  }
                `}
              >
                <Form.Item
                  name="target"
                  label={
                    <IntlMessage id="logManagement.whitelist.hostnameIPAddress" />
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="type"
                  label={
                    <IntlMessage id="logManagement.whitelist.logType" />
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label={
                    <IntlMessage id="logManagement.whitelist.detail" />
                  }
                >
                  <Input.TextArea
                    rows={4}
                    placeholder={
                      t('logManagement.placeholder', {
                        field: t(
                          'logManagement.whitelist.detail'
                        ),
                      }) as string
                    }
                  />
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>

        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="logManagement.detail" />
            }
          >
            {isLoading ? (
              <Skeleton paragraph={{ rows: 3 }} />
            ) : (
              <Descriptions column={2}>
                <Descriptions.Item
                  label={
                    <IntlMessage id="logManagement.createdDate" />
                  }
                >
                  <ShowTagDate
                    date={data?.created_date}
                  />
                </Descriptions.Item>
              </Descriptions>
            )}
          </Card>
        </Col>
      </Row>
    </FallbackError>
  );
};

WhitelistDetailPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [
          permissions['cyber:lm:whitelist:read'],
        ],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default WhitelistDetailPage;
