import {
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';
import type { FormInstance } from 'antd/lib/form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { BrandHero } from '@components/brand-hero';
import { IntlMessage } from '@utilComponents/intl-message';

import { CountriesSelect } from '../../../../shared';
import { OrganizationManagement } from '../../types';

export interface DetailsOrganizationProps {
  disabled?: boolean;
  form?: FormInstance;
  data?: OrganizationManagement;
  mode?: 'create' | 'edit';
  type?: 'detail' | 'management';
}

export const DetailsOrganization = ({
  disabled = false,
  form,
  data,
  mode = 'create',
  type = 'detail',
}: DetailsOrganizationProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      form?.setFieldsValue(data);
    }
    return () => {
      form?.resetFields();
    };
  }, [data, form]);

  return (
    <>
      <BrandHero
        title={
          <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.title" />
        }
        disabled={disabled}
        form={form}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            county: 'ไทย',
            lang: 'th',
            under_department: '-',
            ...data,
          }}
        >
          <Row gutter={[16, 0]}>
            <Col {...getColLayout(8)}>
              <Form.Item
                label={
                  <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.departmentId" />
                }
                name="departmentId"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...getColLayout(8)}>
              <Form.Item
                label={
                  <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.name" />
                }
                name="department_name"
                rules={[
                  validation.required(
                    t(
                      'admin.businessSetting.organizationDetail.basicInfo.nameRequired'
                    )
                  ),
                ]}
              >
                <Input disabled={disabled} />
              </Form.Item>
            </Col>
            <Col {...getColLayout(8)}>
              <Form.Item
                label={
                  <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.nameEn" />
                }
                name="department_name_en"
              >
                <Input disabled={disabled} />
              </Form.Item>
            </Col>
            <Col {...getColLayout(6)}>
              <Form.Item
                label={
                  <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.initials" />
                }
                name="department_abbreviation"
              >
                <Input disabled={disabled} />
              </Form.Item>
            </Col>
            <Col {...getColLayout(6)}>
              <Form.Item
                label={
                  <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.taxpayerIdentificationNumber" />
                }
                name="taxpayer_identification_number"
              >
                <Input disabled={disabled} />
              </Form.Item>
            </Col>
            <Col {...getColLayout(6)}>
              <Form.Item
                label={
                  <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.county" />
                }
                name="county"
              >
                <CountriesSelect
                  valueKey="name"
                  disabled={disabled}
                />
              </Form.Item>
            </Col>
            <Col
              {...getColLayout(6)}
              hidden={type !== 'detail'}
            >
              <Form.Item
                label={
                  <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.lang" />
                }
                name="lang"
                rules={[
                  validation.required(
                    t(
                      'admin.businessSetting.organizationDetail.basicInfo.langRequired'
                    )
                  ),
                ]}
              >
                <Select
                  disabled={disabled}
                  options={[
                    {
                      label: (
                        <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.lang.th" />
                      ),
                      value: 'th',
                    },
                    {
                      label: (
                        <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.lang.en" />
                      ),
                      value: 'en',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              {...getColLayout(6)}
              hidden={type !== 'management'}
            >
              <Form.Item
                label={
                  <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.under" />
                }
                name="under_department"
              >
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BrandHero>
      <Divider orientation="left" orientationMargin={0}>
        <Typography.Title level={4}>
          <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.contactInformation" />
        </Typography.Title>
      </Divider>
      <Form
        layout="vertical"
        form={form}
        initialValues={data}
      >
        <Row gutter={[16, 0]}>
          <Col {...getColLayout(12)}>
            <Form.Item
              label={
                <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.address" />
              }
              name="address"
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}></Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.email" />
              }
              name="email"
              rules={[validation.email()]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.tel1" />
              }
              name="phone_number"
              rules={[
                validation.number(
                  'Please input number only'
                ),
              ]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.tel2" />
              }
              name="phone_number_2"
              rules={[
                validation.number(
                  'Please input number only'
                ),
              ]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              label={
                <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo.website" />
              }
              name="website"
              rules={[validation.domainName()]}
            >
              <Input disabled={disabled} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
