import {
  Descriptions,
  Skeleton,
  Tag,
  Typography,
} from 'antd';

const styles = {
  labelStyle: {
    fontWeight: 'bold',
  },
};

export type RankingReportRemarkProps = {
  loading?: boolean;
};

export const RankingReportRemark = ({
  loading,
}: RankingReportRemarkProps) => {
  if (loading) return <Skeleton active />;

  return (
    <>
      <Typography.Title level={4} className="mb-4">
        *หมายเหตุ
      </Typography.Title>
      <Descriptions
        layout="vertical"
        column={1}
        labelStyle={styles.labelStyle}
      >
        <Descriptions.Item label="หน่วยงานของคุณอยู่">
          <Tag>อันดับที่ 1</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="สรุป">
          คะแนนในส่วนที่ 1 ,2 ,4 ,6 สูงกว่าค่าเฉลี่ย
          คะแนนในส่วนที่ 3 ,5 ต่ำกว่าค่าเฉลี่ย
          หากทำการปรับปรุงให้สูงกว่าค่าเฉลี่ย
          คาดว่าจะเพิ่มค่าเฉลี่ยได้สูงขึ้น
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
