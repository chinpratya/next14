import { Flex } from '@mantine/core';
import {
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { getColLayout, validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

export type DomainSettingFormProps = {
  disabledSite?: boolean;
};

export const DomainSettingForm = ({
  disabledSite,
}: DomainSettingFormProps) => {
  const { t } = useTranslation();

  return (
    <Row justify="center">
      <Col {...getColLayout(14)}>
        <Flex direction="column">
          <Typography.Title level={4}>
            <IntlMessage
              id={
                tokens.cookieManagement.modalAddWebsite
                  .name
              }
            />
          </Typography.Title>
          <Typography.Text type="secondary">
            {t(
              tokens.cookieManagement.modalAddWebsite
                .nameDescription
            )}
          </Typography.Text>
        </Flex>
      </Col>
      <Col {...getColLayout(10)}>
        <Form.Item
          className="mb-0"
          name="name"
          rules={[
            validation.required(
              t(
                tokens.cookieManagement.modalAddWebsite
                  .nameRequired
              ) as string
            ),
          ]}
        >
          <Input
            placeholder={
              t(
                tokens.cookieManagement.modalAddWebsite
                  .namePlaceholder
              ) as string
            }
          />
        </Form.Item>
      </Col>
      <Col {...getColLayout(24)}>
        <Divider />
      </Col>
      <Col {...getColLayout(14)} className="mb-4">
        <Flex direction="column">
          <Typography.Title level={4}>
            <IntlMessage
              id={
                tokens.cookieManagement.modalAddWebsite
                  .url
              }
            />
          </Typography.Title>
          <Typography.Text
            type="secondary"
            style={{
              maxWidth: 200,
              textOverflow: 'ellipsis',
            }}
          >
            {t(
              tokens.cookieManagement.modalAddWebsite
                .urlDescription
            )}
          </Typography.Text>
        </Flex>
      </Col>
      <Col {...getColLayout(10)}>
        <Form.Item
          className="mb-0"
          name="site"
          rules={[
            validation.required(
              t(
                tokens.cookieManagement.modalAddWebsite
                  .urlRequired
              ) as string
            ),
            validation.url(),
          ]}
        >
          <Input
            disabled={disabledSite}
            placeholder={
              t(
                tokens.cookieManagement.modalAddWebsite
                  .urlPlaceholder
              ) as string
            }
          />
        </Form.Item>
      </Col>
      <Col {...getColLayout(24)}>
        <Collapse defaultActiveKey={['advanced']}>
          <Collapse.Panel
            key="advanced"
            header={
              <IntlMessage id={tokens.common.advanced} />
            }
          >
            <Flex align="center">
              <Form.Item
                label={
                  <IntlMessage
                    id={
                      tokens.cookieManagement
                        .modalAddWebsite.pageScan
                    }
                  />
                }
                colon={false}
                className="mb-4"
                name="limit_scan"
                rules={[
                  validation.required(
                    t(
                      tokens.cookieManagement
                        .modalAddWebsite.pageScanRequired
                    ) as string
                  ),
                ]}
                required={false}
              >
                <InputNumber
                  min={1}
                  max={1000}
                  style={{
                    width: 250,
                  }}
                />
              </Form.Item>
              <Typography.Text className="mb-4 ml-2">
                <IntlMessage
                  id={
                    tokens.cookieManagement
                      .modalAddWebsite.maxPageScan
                  }
                />
              </Typography.Text>
            </Flex>
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Row>
  );
};
