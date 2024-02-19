import {
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { RiskMatrixSelect } from '../../../risk-matrix';
import { TagsFormItem } from '../../../tags';
import { WorkflowSelect } from '../../../workflow';
import { WebformRequestModerator } from '../webform-request-moderator';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

export type WebformBasicInfoProps = {
  form?: FormInstance;
  webformId: string;
};

export const WebformBasicInfo = ({
  form,
  webformId,
}: WebformBasicInfoProps) => {
  const { t } = useTranslation();

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:webform:update'],
    ],
  });

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={!editPermission.isAllow}
    >
      <Row gutter={[24, 0]}>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage
                id={tokens.dataBreach.webform.general}
              />
            }
            style={{ height: '400px' }}
          >
            <Form.Item
              label={
                <IntlMessage
                  id={
                    tokens.dataBreach.webform.webformName
                  }
                />
              }
              name="name"
              rules={[
                validation.required(
                  t(
                    tokens.dataBreach.webform
                      .webformNameRequired
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
            <TagsFormItem
              label={
                <IntlMessage
                  id={tokens.dataBreach.webform.tags}
                />
              }
              name="tagID"
              rules={[
                validation.required(
                  t(
                    tokens.dataBreach.webform.tagsRequired
                  )
                ),
              ]}
              disabled={!editPermission.isAllow}
            />
            <Form.Item
              label={
                <IntlMessage
                  id={
                    tokens.dataBreach.webform.description
                  }
                />
              }
              name="description"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Card>
        </Col>
        <Col {...getColLayout(12)}>
          <WebformRequestModerator
            webformId={webformId}
          />
        </Col>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage
                id={tokens.dataBreach.webform.riskMatrix}
              />
            }
          >
            <Form.Item
              label={
                <IntlMessage
                  id={
                    tokens.dataBreach.webform.riskMatrix
                  }
                />
              }
              name="riskassessment"
              rules={[
                validation.required(
                  t(
                    tokens.dataBreach.webform
                      .riskMatrixRequired
                  )
                ),
              ]}
            >
              <RiskMatrixSelect />
            </Form.Item>
          </Card>
        </Col>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage
                id={tokens.dataBreach.webform.workflow}
              />
            }
          >
            <Form.Item
              label={
                <IntlMessage
                  id={
                    tokens.dataBreach.webform
                      .selectWorkflow
                  }
                />
              }
              name="workflowID"
              rules={[
                validation.required(
                  t(
                    tokens.dataBreach.webform
                      .workflowRequired
                  )
                ),
              ]}
            >
              <WorkflowSelect disabled />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};
