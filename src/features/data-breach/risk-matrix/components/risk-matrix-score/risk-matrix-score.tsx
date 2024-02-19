import { EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { RangSlider } from '@components/rang-slider';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetRiskMatrixScore } from '../../api/get-risk-matrix-score';
import { useUpdateRiskScore } from '../../api/update-risk-matrix-score';
import { RiskMatrixScoreRiskDetail } from '../../types';
import { RiskMatrixScoreResolutionDialog } from '../risk-matrix-score-resolution-dialog';

import { RiskMatrixScoreDetailRiskModal } from './components/risk-matrix-score-detail-risk-modal';
import { RiskMatrixScoreResolutionLabel } from './components/risk-matrix-score-resolution-label';
import { RiskMatrixScoreTable } from './components/risk-matrix-score-table';

export type RiskMatrixScoreProps = {
  riskMatrixId: string;
  isReadOnly?: boolean;
  isAllow?: boolean;
};

export const RiskMatrixScore = ({
  riskMatrixId,
  isReadOnly,
  isAllow = true,
}: RiskMatrixScoreProps) => {
  const { data, isLoading, isError } =
    useGetRiskMatrixScore(riskMatrixId);

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:riskmatrix:update'],
    ],
  });

  const toggle = useToggle();

  const updateRiskScore = useUpdateRiskScore({
    riskMatrixId,
  });

  const rangScore = data?.scores as number[];

  const minScore = parseInt(data?.minscore ?? '0');
  const maxScore = parseInt(data?.maxscore ?? '0');

  const columns: ColumnsType<RiskMatrixScoreRiskDetail> =
    [
      {
        title: (
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.riskLevel}
          />
        ),
        key: 'name',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: (
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.scoreTitle}
          />
        ),
        key: 'score',
        dataIndex: 'score',
        width: 200,
      },
      {
        title: (
          <IntlMessage
            id={tokens.dataBreach.request.description}
          />
        ),
        key: 'description',
        dataIndex: 'description',
        width: 350,
      },
      {
        key: 'action',
        width: 85,
        align: 'right',
        render: (risk: RiskMatrixScoreRiskDetail) => (
          <Button
            type="link"
            onClick={() => toggle.change(risk)}
            disabled={!isAllow}
          >
            <IntlMessage id={tokens.common.edit} />
            <EditOutlined />
          </Button>
        ),
      },
    ];

  return (
    <FallbackError isError={isError}>
      {!isReadOnly && (
        <Card
          loading={isLoading}
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
                <IntlMessage id={tokens.common.edit} />{' '}
                <EditOutlined />
              </Button>
            </>
          }
          className={css`
            .ant-card-head {
              border-bottom: 1px solid #f0f0f0;

              .ant-card-head-title,
              .ant-card-extra {
                padding-top: 14px;
                padding-bottom: 14px;
              }
            }
          `}
        >
          <div style={{ marginTop: '40px' }}>
            <RangSlider
              value={rangScore}
              min={minScore}
              max={maxScore}
              colors={data?.color}
              onChange={updateRiskScore.submit}
              disable={!editPermission.isAllow}
            />
            <RiskMatrixScoreResolutionLabel
              resolution={data?.resolution}
              scores={data?.scores}
              minScore={minScore}
              maxScore={maxScore}
            />
          </div>
        </Card>
      )}
      <Card
        loading={isLoading}
        title={
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.exampleTitle}
          />
        }
        className={css`
          .ant-card-head {
            border-bottom: 1px solid #f0f0f0;

            .ant-card-head-title,
            .ant-card-extra {
              padding-top: 16px;
              padding-bottom: 16px;
            }
          }
        `}
      >
        <RiskMatrixScoreTable
          riskMatrixScorePoint={data?.value}
          resolution={data?.resolution}
          scores={data?.scores}
          minScore={minScore}
          maxScore={maxScore}
        />
      </Card>
      <Card
        title={
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.riskDetails}
          />
        }
        loading={isLoading}
        className={css`
          .ant-card-head {
            border-bottom: 1px solid #f0f0f0;

            .ant-card-head-title {
              padding-top: 16px;
              padding-bottom: 16px;
            }
          }
        `}
      >
        <Table
          columns={columns}
          dataSource={data?.riskDetail ?? []}
          rowKey="tableID"
          tableLayout="fixed"
          scroll={{
            x: 1055,
          }}
          pagination={false}
        />
      </Card>
      <RiskMatrixScoreResolutionDialog
        open={toggle.openEdit}
        onClose={() => toggle.edit()}
        riskMatrixId={riskMatrixId}
        currentResolution={data?.resolution.toString()}
      />
      <RiskMatrixScoreDetailRiskModal
        open={toggle.openChange}
        onClose={() => toggle.change()}
        data={toggle.data}
        riskMatrixId={riskMatrixId}
      />
    </FallbackError>
  );
};
