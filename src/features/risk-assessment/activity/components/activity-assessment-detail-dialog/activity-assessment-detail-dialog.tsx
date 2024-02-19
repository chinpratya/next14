import { Tabs } from 'antd';

import { Modal } from '@components/modal';

import { useGetAssessmentOfActivity } from '../../api/get-assessment-of-activity';
import { ActivityAssessmentPreview } from '../activity-assessment-preview';

import { ActivityAssessmentMeasures } from './components/activity-assessment-measures';

export type ActivityAssessmentDetailDialogProps = {
  open?: boolean;
  onClose?: () => void;
  assessmentID?: string;
};

export const ActivityAssessmentDetailDialog = ({
  open,
  onClose,
  assessmentID,
}: ActivityAssessmentDetailDialogProps) => {
  const { data, isLoading, isError } =
    useGetAssessmentOfActivity(assessmentID ?? '');

  return (
    <Modal
      title="การประเมินความเสี่ยง"
      open={open}
      onCancel={onClose}
      width="75vw"
      isError={isError}
      loading={isLoading}
    >
      <Tabs
        items={[
          {
            label: 'สรุปการประเมิน',
            key: 'summary',
            children: (
              <ActivityAssessmentPreview data={data} />
            ),
          },
          {
            label: 'การจัดการความเสี่ยง',
            key: 'management',
            children: (
              <ActivityAssessmentMeasures
                measures={data?.measure}
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};
