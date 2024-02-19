import { EyeOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useToggle } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListAssessmentOfActivity } from '../../api/list-assessment-of-activity';
import { ActivityOfAssessmentType } from '../../types';
import { ActivityAssessmentDetailDialog } from '../activity-assessment-detail-dialog';

export type ActivityAssessmentListProps = {
  activityId: string;
};

export const ActivityAssessmentList = ({
  activityId,
}: ActivityAssessmentListProps) => {
  const toggle = useToggle();

  const { data, isLoading, isError } =
    useListAssessmentOfActivity(activityId);

  const columns: ColumnsType<ActivityOfAssessmentType> = [
    {
      title: 'ครั้งที่',
      key: 'name',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: 'คะแนนความเสี่ยง',
      key: 'rawScore',
      dataIndex: 'rawScore',
      width: 150,
    },
    {
      title: 'ระดับความเสี่ยง',
      key: 'score',
      dataIndex: 'score',
      width: 150,
    },
    {
      title: 'เทมเพลตการประเมิน',
      key: 'riskname',
      dataIndex: 'riskname',
      width: 450,
      ellipsis: true,
    },
    {
      key: 'action',
      className: 'text-right',
      width: 50,
      render: (assessment: ActivityOfAssessmentType) => (
        <EyeOutlined
          className="font-size-md cursor-pointer"
          onClick={() => toggle.preview(assessment)}
        />
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Table
        tableLayout="fixed"
        scroll={{
          x: 900,
        }}
        columns={columns}
        loading={isLoading}
        dataSource={data?.data}
        rowKey="ObjectUUID"
        pagination={false}
      />
      <ActivityAssessmentDetailDialog
        open={toggle.openPreview}
        onClose={() => toggle.preview()}
        assessmentID={toggle.data?.ObjectUUID as string}
      />
    </FallbackError>
  );
};
