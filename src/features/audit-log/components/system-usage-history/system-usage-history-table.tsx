// import {
//   HomeOutlined,
//   LoadingOutlined,
//   SettingFilled,
//   SmileOutlined,
//   SyncOutlined,
// } from '@ant-design/icons';
import { Table } from 'antd';

import { ShowTagDate } from '@components/show-tag-date';

// import { DropdownTable } from '@components/dropdown-table';
import { SystemUsageHistory } from '../../types';

type SystemUsageHistoryTableProps = {
  dataSource: SystemUsageHistory[];
  isLoading: boolean;
};
export const SystemUsageHistoryTable = ({
  dataSource,
  isLoading,
}: SystemUsageHistoryTableProps) => {
  const columns = [
    {
      title: 'อีเมล',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'กิจกรรม',
      dataIndex: 'request_type',
      key: 'request_type',
    },
    {
      title: 'การกระทำ',
      render: (data: SystemUsageHistory) =>
        data.endpoint?.path,
    },
    {
      title: 'เบราว์เซอร์',
      dataIndex: 'browser',
      key: 'browser',
    },
    {
      title: 'อุปกรณ์',
      dataIndex: 'device_type',
      key: 'device_type',
    },
    {
      title: 'ไอพี',
      dataIndex: 'ip_address',
      key: 'ip_address',
    },
    {
      title: 'ประเทศ',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'เวลา',
      dataIndex: 'createdDt',
      key: 'createdDt',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    // {
    //   key: 'action',
    //   width: 50,
    //   render: (assessment: AssessmentSubmission) => (
    //     <DropdownTable
    //       items={[
    //         {
    //           key: 'edit',
    //           label: 'ดูรายละเอียด',
    //           icon: <EyeOutlined />,
    //           onClick: () =>
    //             router.push(
    //               `${router.pathname}/${assessment.ObjectUUID}`
    //             ),
    //         },
    //       ]}
    //     />
    //   ),
    // },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: true }}
      pagination={false}
      loading={isLoading}
    />
  );
};
