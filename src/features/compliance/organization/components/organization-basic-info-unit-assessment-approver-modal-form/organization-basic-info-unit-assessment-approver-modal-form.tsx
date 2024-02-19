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

type OrganizationBasicInfoUnitAssessmentApproverModalFormProps =
  {
    form: FormInstance;
  };

export const OrganizationBasicInfoUnitAssessmentApproverModalForm =
  ({
    form,
  }: OrganizationBasicInfoUnitAssessmentApproverModalFormProps) => {
    const { t } = useTranslation();

    return (
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'compliance.organization.detail.branch.assessmentApprover.nameRequired'
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
                <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.department" />
              }
              name="department"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.email" />
              }
              name="email"
              rules={[
                validation.required(
                  t(
                    'compliance.organization.detail.branch.assessmentApprover.emailRequired'
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
                <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.position" />
              }
              name="position"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.tel" />
              }
              name="tel"
              rules={[
                validation.required(
                  t(
                    'compliance.organization.detail.branch.assessmentApprover.telRequire'
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
            <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.description" />
          }
          name="description"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    );
  };
