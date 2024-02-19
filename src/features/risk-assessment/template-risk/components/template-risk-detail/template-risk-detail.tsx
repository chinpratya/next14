import {
  Card,
  FormInstance,
  Tabs,
  Row,
  Col,
  Form,
  Select,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { getColLayout, validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetMetaTemplateRisk } from '../../api/get-meta-template-risk';
import { TemplateRiskForm } from '../template-risk-form';
import { TemplateRiskSetting } from '../template-risk-setting';

export type TemplateRiskDetalProps = {
  form: FormInstance;
  onChangTab: (key: string) => void;
  assessmentId: string;
};

export const TemplateRiskDetal = ({
  form,
  onChangTab,
  assessmentId,
}: TemplateRiskDetalProps) => {
  const { t } = useTranslation();
  const { data } = useGetMetaTemplateRisk();

  const optionsStatus = data?.status?.map((value) => {
    return {
      label: value.name,
      value: value.ObjectUUID,
    };
  });

  return (
    <Card>
      <Tabs
        onChange={(e) => onChangTab(e)}
        items={[
          {
            key: 'base-info',
            label: (
              <IntlMessage
                id={
                  tokens.riskAssessment.riskTemplate
                    .basicInfo
                }
              />
            ),
            children: (
              <Row gutter={[24, 0]}>
                <Col {...getColLayout(12)}>
                  <Card>
                    <TemplateRiskForm form={form} />
                  </Card>
                </Col>
                <Col {...getColLayout(12)}>
                  <Card
                    title={
                      <IntlMessage
                        id={
                          tokens.riskAssessment
                            .riskTemplate.status
                        }
                      />
                    }
                  >
                    <Form form={form} layout="vertical">
                      <Form.Item
                        name="status"
                        label={
                          <IntlMessage
                            id={
                              tokens.riskAssessment
                                .riskTemplate.status
                            }
                          />
                        }
                        rules={[
                          validation.required(
                            t(
                              tokens.riskAssessment
                                .riskTemplate
                                .statusRequired
                            )
                          ),
                        ]}
                      >
                        <Select options={optionsStatus} />
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
            ),
          },
          {
            key: 'setting',
            label: (
              <IntlMessage
                id={
                  tokens.riskAssessment.riskTemplate
                    .customize
                }
              />
            ),
            children: (
              <>
                <TemplateRiskSetting
                  assessmentId={assessmentId}
                />
              </>
            ),
          },
        ]}
      />
    </Card>
  );
};
