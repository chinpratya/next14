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

type OrganizationBasicInfoUnitListRespondentsModalFormProps =
  {
    form: FormInstance;
  };

export const OrganizationBasicInfoUnitListRespondentsModalForm =
  ({
    form,
  }: OrganizationBasicInfoUnitListRespondentsModalFormProps) => {
    const { t } = useTranslation();

    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          tel: '',
        }}
      >
        <Form.Item
          label={
            <IntlMessage id="compliance.organization.detail.branch.listRespondents.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'compliance.organization.detail.branch.listRespondents.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={[24, 0]}>
          <Col {...getColLayout(12)}>
            <Form.Item
              label={
                <IntlMessage id="compliance.organization.detail.branch.listRespondents.department" />
              }
              name="department"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <IntlMessage id="compliance.organization.detail.branch.listRespondents.email" />
              }
              name="email"
              rules={[
                validation.required(
                  t(
                    'compliance.organization.detail.branch.listRespondents.emailRequired'
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
                <IntlMessage id="compliance.organization.detail.branch.listRespondents.position" />
              }
              name="position"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <IntlMessage id="compliance.organization.detail.branch.listRespondents.tel" />
              }
              name="tel"
              rules={[
                validation.required(
                  t(
                    'compliance.organization.detail.branch.listRespondents.telRequired'
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
            <IntlMessage id="compliance.organization.detail.branch.listRespondents.description" />
          }
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    );
  };
