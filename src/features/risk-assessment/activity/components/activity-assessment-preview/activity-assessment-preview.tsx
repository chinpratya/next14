import { css } from '@emotion/css';
import { Card, Descriptions } from 'antd';

import {
  BORDER_COLOR,
  PRIMARY_COLOR,
} from '@/config/color';
import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { PreviewTemplateOfRiskAssessmentType } from '../../../template-risk';

export type ActivityAssessmentPreviewProps = {
  data?: PreviewTemplateOfRiskAssessmentType;
};

export const ActivityAssessmentPreview = ({
  data,
}: ActivityAssessmentPreviewProps) => {
  const likelihood = data?.likelihood;
  const effect = data?.effect;
  const riskDetail = data?.riskDetail;

  return (
    <div
      className={css`
        .ant-card-head {
          background-color: #fafafa;
          border-bottom: 1px solid ${BORDER_COLOR};

          .ant-card-head-title {
            color: ${PRIMARY_COLOR};
            padding-bottom: 8px;
          }
        }
      `}
    >
      <Card
        title={
          <IntlMessage
            id={
              tokens.riskAssessment.activity
                .changeLikelihood
            }
          />
        }
      >
        <Descriptions
          layout="vertical"
          column={1}
          labelStyle={{ fontWeight: 'bold' }}
        >
          <Descriptions.Item
            label={
              <IntlMessage
                id={
                  tokens.riskAssessment.activity
                    .likelihood
                }
              />
            }
          >
            {likelihood?.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage
                id={
                  tokens.riskAssessment.activity
                    .description
                }
              />
            }
          >
            {likelihood?.description}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        title={
          <IntlMessage
            id={tokens.riskAssessment.activity.effectList}
          />
        }
      >
        {effect?.map((item) => (
          <Card key={item.effectID} title={item.name}>
            <Descriptions
              layout="vertical"
              column={1}
              labelStyle={{ fontWeight: 'bold' }}
            >
              <Descriptions.Item
                label={
                  <IntlMessage
                    id={
                      tokens.riskAssessment.activity
                        .severity
                    }
                  />
                }
              >
                {item.table.severity}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage
                    id={
                      tokens.riskAssessment.activity
                        .effect
                    }
                  />
                }
              >
                {item.table.effect}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage
                    id={
                      tokens.riskAssessment.activity
                        .descriptionSeverity
                    }
                  />
                }
              >
                {item.table.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ))}
      </Card>
      <Card
        title={
          <IntlMessage
            id={tokens.riskAssessment.activity.riskLevel}
          />
        }
      >
        <Descriptions
          layout="vertical"
          column={1}
          labelStyle={{ fontWeight: 'bold' }}
        >
          <Descriptions.Item
            label={
              <IntlMessage
                id={
                  tokens.riskAssessment.activity.riskLevel
                }
              />
            }
          >
            {riskDetail?.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage
                id={
                  tokens.riskAssessment.activity.riskScore
                }
              />
            }
          >
            {riskDetail?.score}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage
                id={
                  tokens.riskAssessment.activity
                    .description
                }
              />
            }
          >
            {riskDetail?.description}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};
