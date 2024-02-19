import { css } from '@emotion/css';
import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { SelectCountry } from '@/components/share-components/select-country';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

export type DataControllerExternalProps = {
  isPerson: boolean;
};

export const DataControllerExternal = ({
  isPerson,
}: DataControllerExternalProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Row>
        <Col {...getColLayout(24)}>
          <Form.Item
            label={
              <IntlMessage id="dataMapping.dataController.detail.organization" />
            }
            name="organizationName"
            rules={[
              validation.required(
                t(
                  'dataMapping.dataController.detail.organizationRequired'
                )
              ),
            ]}
          >
            <Input className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label={
          isPerson ? (
            <IntlMessage id="dataMapping.dataController.detail.personalInformation" />
          ) : (
            <IntlMessage id="dataMapping.dataController.detail.juristicInformation" />
          )
        }
        required
        className="mb-4"
      >
        <Row
          gutter={[16, 16]}
          className={css`
            margin-top: 12px;

            .ant-form-item-label > label {
              font-weight: normal !important;
            }
          `}
        >
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                isPerson ? (
                  <IntlMessage id="dataMapping.dataController.detail.fullName" />
                ) : (
                  <IntlMessage id="dataMapping.dataController.detail.juristicName" />
                )
              }
              name={
                isPerson ? 'name' : 'organizationName'
              }
              rules={[
                validation.required(
                  isPerson
                    ? t(
                        'dataMapping.dataController.detail.fullNameRequired'
                      )
                    : t(
                        'dataMapping.dataController.detail.juristicNameRequired'
                      )
                ),
              ]}
            >
              <Input
                disabled={!isPerson}
                className="w-100"
              />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.dataController.detail.email" />
              }
              name="email"
              rules={[
                validation.required(
                  t(
                    'dataMapping.dataController.detail.emailRequired'
                  )
                ),
                validation.email(),
              ]}
            >
              <Input className="w-100" />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.dataController.detail.tel" />
              }
              name="tel"
              rules={[validation.phone()]}
            >
              <Input className="w-100" />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.dataController.detail.address" />
              }
              name="address"
              rules={[
                validation.required(
                  t(
                    'dataMapping.dataController.detail.addressRequired'
                  )
                ),
              ]}
            >
              <Input className="w-100" />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.dataController.detail.country" />
              }
              name="countryID"
              rules={[
                validation.required(
                  t(
                    'dataMapping.dataController.detail.countryRequired'
                  )
                ),
              ]}
            >
              <SelectCountry />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.dataController.detail.url" />
              }
              name="url"
              rules={[validation.url()]}
            >
              <Input className="w-100" />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};
