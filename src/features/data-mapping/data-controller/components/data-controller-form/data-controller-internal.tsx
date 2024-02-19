import { css } from '@emotion/css';
import { Col, Form, Input, Row } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SelectCountry } from '@/components/share-components/select-country';
import { OrganizationManagement } from '@/features/admin';
import { useAuth } from '@/stores/auth';
import { getColLayout, validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationPicker } from '../../../shared';

export type DataControllerInternalProps = {
  form?: FormInstance;
  isPerson: boolean;
  isCreate?: boolean;
};

export const DataControllerInternal = ({
  form,
  isPerson,
  isCreate,
}: DataControllerInternalProps) => {
  const { t } = useTranslation();
  const { organizationId } = useAuth();

  useEffect(() => {
    if (organizationId) {
      form?.setFieldValue(
        'organizationId',
        organizationId
      );
    }
  }, [organizationId, form]);

  const handleAutoFillOrganization = (
    organization: OrganizationManagement
  ) =>
    form?.setFieldsValue({
      ...organization,
      name: organization.department_name,
    });

  return (
    <>
      <Row>
        <Col {...getColLayout(24)}>
          <Form.Item
            label={
              <IntlMessage id="dataMapping.dataController.detail.selectOrganization" />
            }
            name="organizationID"
            rules={[
              {
                required: true,
                message: (
                  <IntlMessage id="dataMapping.dataController.detail.selectOrganizationRequired" />
                ),
              },
            ]}
            initialValue={organizationId}
          >
            <OrganizationPicker
              callbackFn={
                !isPerson
                  ? (organization) =>
                      handleAutoFillOrganization(
                        organization
                      )
                  : undefined
              }
              readonly={true}
            />
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
              shouldUpdate={(prev, next) =>
                prev?.organizationID !==
                next?.organizationID
              }
            >
              {() => {
                return (
                  <Form.Item
                    label={
                      isPerson ? (
                        <IntlMessage id="dataMapping.dataController.detail.fullName" />
                      ) : (
                        <IntlMessage id="dataMapping.dataController.detail.juristicName" />
                      )
                    }
                    name={
                      isPerson
                        ? 'userName'
                        : 'organizationID'
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
                    {isPerson ? (
                      <Input />
                    ) : (
                      <OrganizationPicker readonly />
                    )}
                  </Form.Item>
                );
              }}
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
              name={isCreate ? 'county' : 'countryID'}
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
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.dataController.detail.note" />
              }
              name="note"
            >
              <Input className="w-100" />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};
