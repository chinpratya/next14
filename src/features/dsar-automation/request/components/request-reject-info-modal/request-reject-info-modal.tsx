import { Modal } from '@components/modal';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import { css } from '@emotion/css';

export type RequestRejectInfoModalProps = {
  open: boolean;
  onClose: () => void;
};

const dataSources = [
  {
    title: 'การเพิกถอนความยินยอม',
    key: 'withdraw-consent',
    'request-not-reasonable': false,
    'request-overstated': false,
    'data-owner-already-have-data': false,
    'freedom-of-expression': false,
    contract: false,
    'law-permission': true,
    'negative-impact': true,
    'necessary-for-processing': false,
    'public-interest': false,
    'establish-use-legal-claim': false,
    'benefit-by-law': false,
  },
  {
    title: 'การเข้าถึงข้อมูลส่วนบุคคล',
    key: 'access-personal-data',
    'request-not-reasonable': true,
    'request-overstated': true,
    'data-owner-already-have-data': false,
    'freedom-of-expression': false,
    contract: false,
    'law-permission': true,
    'negative-impact': true,
    'necessary-for-processing': false,
    'public-interest': false,
    'establish-use-legal-claim': false,
    'benefit-by-law': false,
  },
  {
    title: 'การแก้ไขข้อมูลส่วนบุคคล ให้ถูกต้อง',
    key: 'correct-personal-data',
    'request-not-reasonable': true,
    'request-overstated': true,
    'data-owner-already-have-data': false,
    'freedom-of-expression': false,
    contract: false,
    'law-permission': true,
    'negative-impact': true,
    'necessary-for-processing': false,
    'public-interest': false,
    'establish-use-legal-claim': false,
    'benefit-by-law': false,
  },
  {
    title: 'การลบข้อมูลส่วนบุคคล',
    key: 'delete-personal-data',
    'request-not-reasonable': true,
    'request-overstated': true,
    'data-owner-already-have-data': false,
    'freedom-of-expression': true,
    contract: true,
    'law-permission': true,
    'negative-impact': true,
    'necessary-for-processing': true,
    'public-interest': true,
    'establish-use-legal-claim': true,
    'benefit-by-law': false,
  },
  {
    title: 'การระงับการประมวลผล ข้อมูล 162',
    key: 'suspend-process-data',
    'request-not-reasonable': true,
    'request-overstated': true,
    'data-owner-already-have-data': false,
    'freedom-of-expression': false,
    contract: false,
    'law-permission': false,
    'negative-impact': true,
    'necessary-for-processing': false,
    'public-interest': true,
    'establish-use-legal-claim': true,
    'benefit-by-law': false,
  },
  {
    title: 'การให้โอนย้ายข้อมูลส่วนบุคคล',
    key: 'transfer-personal-data',
    'request-not-reasonable': true,
    'request-overstated': true,
    'data-owner-already-have-data': false,
    'freedom-of-expression': false,
    contract: false,
    'law-permission': false,
    'negative-impact': true,
    'necessary-for-processing': false,
    'public-interest': true,
    'establish-use-legal-claim': true,
    'benefit-by-law': false,
  },
  {
    title: 'การคัดค้านการประมวลผล ข้อมูล',
    key: 'object-process-data',
    'request-not-reasonable': true,
    'request-overstated': true,
    'data-owner-already-have-data': false,
    'freedom-of-expression': false,
    contract: false,
    'law-permission': false,
    'negative-impact': false,
    'necessary-for-processing': false,
    'public-interest': true,
    'establish-use-legal-claim': true,
    'benefit-by-law': true,
  },
];

export const RequestRejectInfoModal = ({
  open,
  onClose,
}: RequestRejectInfoModalProps) => {
  const reasonRender = (checked: boolean) => {
    if (!checked)
      return (
        <CloseCircleFilled
          style={{ color: '#ff4d4f', fontSize: 28 }}
        />
      );
    return (
      <CheckCircleFilled
        style={{ color: '#52c41a', fontSize: 28 }}
      />
    );
  };

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: 'สิทธิ์',
      key: 'right',
      width: 180,
      dataIndex: 'title',
    },
    {
      title:
        'เหตุแห่งการปฏิเสธการปฏิบัติตามคำร้องของเจ้าของข้อมูล',
      key: 'reason',
      width: 130 * 11,
      align: 'center',
      children: [
        {
          title: 'คำขอไม่สมเหตุสมผล',
          key: 'request-not-reasonable',
          dataIndex: 'request-not-reasonable',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title: 'คำขอฟุ่มเฟือย',
          key: 'request-overstated',
          dataIndex: 'request-overstated',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title: 'เจ้าของข้อมูลมีข้อมูลอยู่แล้ว',
          key: 'data-owner-already-have-data',
          dataIndex: 'data-owner-already-have-data',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title: 'เก็บเพื่อเสรีภาพ ในการแสดงความ คิดเห็น',
          key: 'freedom-of-expression',
          dataIndex: 'freedom-of-expression',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title: 'เกี่ยวกับการ ทำตามสัญญา',
          key: 'contract',
          dataIndex: 'contract',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title: 'กฎหมาย อนุญาติ',
          key: 'law-permission',
          dataIndex: 'law-permission',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title: 'เกิดผลกระทบ ด้านลบแก่ บุคคลอื่น',
          key: 'negative-impact',
          dataIndex: 'negative-impact',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title: 'จำเป็นสำหรับ การประมวลผล',
          key: 'necessary-for-processing',
          dataIndex: 'necessary-for-processing',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title:
            'ประโยชน์สาธารณะ หรืออำนาจรัฐ หรือหน้าที่ตาม กฎหมาย',
          key: 'public-interest',
          dataIndex: 'public-interest',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title: 'ก่อตั้ง ใช้หรือ ป้องกันสิทธิ ทางกฎหมาย',
          key: 'establish-use-legal-claim',
          dataIndex: 'establish-use-legal-claim',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
        {
          title: 'ประโยชน์ โดยชอบ ด้วยกฎหมาย',
          key: 'benefit-by-law',
          dataIndex: 'benefit-by-law',
          width: 130,
          align: 'center',
          render: reasonRender,
        },
      ],
    },
  ];

  return (
    <Modal
      title="เหตุแห่งการปฏิเสธการปฏิบัติตามคำร้องของเจ้าของข้อมูล"
      open={open}
      onCancel={onClose}
      width="90vw"
      footer={null}
    >
      <Table
        className={css`
          .ant-table-thead > tr > th {
            color: #fff;
            font-weight: normal;
            background-color: rgba(26, 51, 83, 1);
            text-align: center;
          }

          .ant-table-thead > tr:last-child > th {
            :nth-child(odd) {
              background-color: rgba(26, 51, 83, 0.8);
            }

            :nth-child(even) {
              background-color: rgba(26, 51, 83, 1);
            }
          }
        `}
        rowKey="key"
        tableLayout="fixed"
        scroll={{ x: 130 * 11 + 180 }}
        columns={columns}
        dataSource={dataSources}
        pagination={false}
        bordered
      />
    </Modal>
  );
};
