import { FallbackError } from '@utilComponents/fallback-error';

import { useGetTemplateRiskScore } from '../../api/get-template-risk-score';
import { TemplateRiskScore } from '../../types';
import { TemplateRiskSettingChance } from '../template-risk-setting-chance';
import { TemplateRiskSettingDetailRisk } from '../template-risk-setting-detail-risk';
import { TemplateRiskSettingEffect } from '../template-risk-setting-effect';
import { TemplateRiskSettingScore } from '../template-risk-setting-score';
import { TemplateRiskSettingScoreTable } from '../template-risk-setting-score-table';

export type TemplateRiskSettingProps = {
  assessmentId: string;
};

export const TemplateRiskSetting = ({
  assessmentId,
}: TemplateRiskSettingProps) => {
  const { data, isLoading, isError } =
    useGetTemplateRiskScore({
      assessmentId,
    });

  const minScore = data?.minscore ?? 0;
  const maxScore = data?.maxscore ?? 0;

  return (
    <>
      <TemplateRiskSettingChance
        assessmentId={assessmentId}
      />
      <TemplateRiskSettingEffect
        assessmentId={assessmentId}
      />
      <FallbackError isError={isError}>
        <TemplateRiskSettingScore
          assessmentId={assessmentId}
          loading={isLoading}
          data={data as TemplateRiskScore}
        />
        <TemplateRiskSettingScoreTable
          templateRiskScorePoint={data?.value}
          resolution={data?.resolution}
          scores={data?.scores}
          minScore={minScore}
          maxScore={maxScore}
          loading={isLoading}
        />
        <TemplateRiskSettingDetailRisk
          loading={isLoading}
          data={data as TemplateRiskScore}
          assessmentId={assessmentId}
        />
      </FallbackError>
    </>
  );
};
