import { css } from '@emotion/css';
import { useToggle } from '@mantine/hooks';
import { Button, Card } from 'antd';

import { MaturityModel } from '../../types';
import { MaturityModelManageDetailModal } from '../maturity-model-manage-detail-modal';

import { MaturityModelSummaryDetailTable } from './maturity-model-summary-detail-table';

export type MaturityModelSummaryDetailProps = {
  maturityModelId: string;
  maturityModel?: MaturityModel;
};

export const MaturityModelSummaryDetail = ({
  maturityModelId,
  maturityModel,
}: MaturityModelSummaryDetailProps) => {
  const [openManageDetailModal, toggleManageDetailModal] =
    useToggle();

  return (
    <>
      <Card
        title="รายละเอียด Maturity Model"
        className={css`
          .ant-card-head {
            padding-bottom: 16px;
            border-bottom: 1px solid #e8e8e8;
          }
        `}
        extra={
          <Button
            type="primary"
            onClick={() => toggleManageDetailModal()}
            ghost
          >
            จัดการ
          </Button>
        }
      >
        <MaturityModelSummaryDetailTable
          maturityModels={maturityModel?.detail}
        />
      </Card>
      <MaturityModelManageDetailModal
        open={openManageDetailModal}
        maturityModelId={maturityModelId}
        onCancel={toggleManageDetailModal}
        maturityModels={maturityModel?.detail}
      />
    </>
  );
};
