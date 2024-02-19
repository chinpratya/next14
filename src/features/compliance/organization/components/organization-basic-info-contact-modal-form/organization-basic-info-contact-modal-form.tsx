import { css } from '@emotion/css';
import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type OrganizationBasicInfoContactModalFormProps = {
  form: FormInstance;
};

export const OrganizationBasicInfoContactModalForm = ({
  form,
}: OrganizationBasicInfoContactModalFormProps) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label={
          <IntlMessage id="compliance.organization.detail.contact.name" />
        }
        name="name"
        rules={[
          validation.required(
            t(
              'compliance.organization.detail.contact.nameRequired'
            )
          ),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="compliance.organization.detail.contact.organization" />
        }
        name="organizationID"
      >
        <Input disabled />
      </Form.Item>
      <Row gutter={[24, 0]}>
        <Col {...getColLayout(12)}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.contact.department" />
            }
            name="department"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.contact.email" />
            }
            name="email"
            rules={[
              validation.required(
                t(
                  'compliance.organization.detail.contact.emailRequired'
                )
              ),
              validation.email(),
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col {...getColLayout(12)}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.contact.position" />
            }
            name="position"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.contact.tel" />
            }
            name="tel"
            rules={[
              validation.required(
                t(
                  'compliance.organization.detail.contact.telRequired'
                )
              ),
              validation.phone(),
            ]}
          >
            <Input
              type="number"
              className={css`
                ::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              `}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label={
          <IntlMessage id="compliance.organization.detail.contact.description" />
        }
        name="description"
      >
        <Input.TextArea rows={3} />
      </Form.Item>
    </Form>
  );
};
