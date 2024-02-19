import { EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Card } from 'antd';

import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { RangSlider } from '@components/rang-slider';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateTemplateRiskScore } from '../../api/update-template-risk-score';
import { TemplateRiskScore } from '../../types';

import { TemplateRiskSettingChangScoreModal } from './template-risk-setting-chang-score-modal';
import { TemplateRiskSettingScoreLabel } from './template-risk-setting-score-label';

export type TemplateRiskSettingScoreProps = {
  assessmentId: string;
  data: TemplateRiskScore;
  loading: boolean;
};

export const TemplateRiskSettingScore = ({
  assessmentId,
  data,
  loading,
}: TemplateRiskSettingScoreProps) => {
  const toggle = useToggle();

  const updateRiskScore = useUpdateTemplateRiskScore({
    assessmentId,
  });

  const editPermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions[
        'pdpakit:assessment:templaterisk:update'
      ],
    ],
  });

  const rangScore = data?.scores as number[];

  const minScore = data?.minscore ?? 0;
  const maxScore = data?.maxscore ?? 0;

  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.scoreTitle}
        />
      }
      extra={
        <>
          <Button
            type="link"
            className="p-0 m-0"
            onClick={() => toggle.edit()}
            disabled={!editPermission.isAllow}
          >
            <IntlMessage id={tokens.common.edit} />
            <EditOutlined />
          </Button>
        </>
      }
      loading={loading}
      className={css`
        .ant-card-head {
          border-bottom: 1px solid #e0e0e0;
          min-height: 60px;
        }
      `}
    >
      <div style={{ margin: '40px' }}>
        <RangSlider
          value={rangScore}
          min={minScore}
          max={maxScore}
          colors={data?.color}
          onChange={(e) =>
            updateRiskScore.submit({ score: e })
          }
          disable={!editPermission.isAllow}
        />
        <TemplateRiskSettingScoreLabel
          resolution={data?.resolution}
          scores={data?.scores}
          minScore={minScore}
          maxScore={maxScore}
        />
        <TemplateRiskSettingChangScoreModal
          open={toggle.openEdit}
          onClose={() => toggle.edit()}
          assessmentId={assessmentId}
          currentResolution={data?.resolution}
        />
      </div>
    </Card>
  );
};
