import { Descriptions } from 'antd';
import _ from 'lodash';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  RiskLikelihoodType,
  RiskEffectType,
} from '../../types';

export type RiskAssessmentResultProps = {
  riskLikelihoodValue?: number;
  riskLikelihood?: RiskLikelihoodType[];
  riskEffectValue?: number;
  riskEffect?: RiskEffectType[];
};

export const RiskAssessmentResult = ({
  riskLikelihoodValue,
  riskLikelihood,
  riskEffectValue,
  riskEffect,
}: RiskAssessmentResultProps) => {
  const likelihood = _.find(riskLikelihood, {
    ObjectUUID: riskLikelihoodValue,
  });

  const effect = _.find(riskEffect, {
    ObjectUUID: riskEffectValue,
  });

  return (
    <>
      <Descriptions
        title={
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.chanceTitle}
          />
        }
        column={1}
        layout="vertical"
        labelStyle={{
          fontWeight: 'bold',
        }}
      >
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.riskMatrix.likelihood}
            />
          }
        >
          {likelihood?.name ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={
                tokens.dataBreach.riskMatrix.description
              }
            />
          }
        >
          {likelihood?.description ?? '-'}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title={
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.effectTitle}
          />
        }
        column={1}
        layout="vertical"
        labelStyle={{
          fontWeight: 'bold',
        }}
      >
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.riskMatrix.severity}
            />
          }
        >
          {effect?.severity ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={
                tokens.dataBreach.riskMatrix.effectTitle
              }
            />
          }
        >
          {effect?.effect ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={
                tokens.dataBreach.riskMatrix
                  .descriptionSeverity
              }
            />
          }
        >
          {effect?.description ?? '-'}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
