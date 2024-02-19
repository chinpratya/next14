import { Card } from 'antd';

import { tokens } from '@/lang';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { RiskMatrixScoreTable } from '../../../risk-matrix';
import {
  RiskAssessmentLikelihood,
  RiskAssessmentEffect,
  RiskAssessmentDetail,
} from '../../../shared';
import { useGetRequestAssessment } from '../../api/get-request-assessment';

export type RequestRiskMatrixProps = {
  requestId: string;
};

export const RequestRiskMatrix = ({
  requestId,
}: RequestRiskMatrixProps) => {
  const { data, isLoading, isError } =
    useGetRequestAssessment(requestId);

  return (
    <FallbackError isError={isError}>
      <Card>
        <RiskAssessmentLikelihood
          isLoading={isLoading}
          value={data?.likelihoodValue}
          dataSource={data?.likelihood}
        />
        <RiskAssessmentEffect
          isLoading={isLoading}
          value={data?.effectValue}
          dataSource={data?.effect}
        />
        <Card
          title={
            <IntlMessage
              id={tokens.dataBreach.request.exampleTitle}
            />
          }
          loading={isLoading}
        >
          <RiskMatrixScoreTable
            riskMatrixScorePoint={data?.value}
            resolution={data?.resolution}
            scores={data?.scores}
            minScore={data?.minScore}
            maxScore={data?.maxScore}
          />
        </Card>
        <RiskAssessmentDetail
          riskDetails={data?.riskDetail}
          isLoading={isLoading}
        />
      </Card>
    </FallbackError>
  );
};
