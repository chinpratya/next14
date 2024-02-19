import { PaperClipOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button } from 'antd';

import { Modal } from '../modal';

export type ModalDetailMeasuresProps = {
  openModal: boolean;
  nameControl: string;
  description: string;
  onCancel: () => void;
};

export const ModalDetailMeasures = ({
  openModal,
  onCancel,
  nameControl,
  description,
}: ModalDetailMeasuresProps) => {
  return (
    <>
      <Modal
        title={`รายละเอียดมาตรการควบคุม : ${nameControl}`}
        open={openModal}
        footer={[
          <Button key="btn" onClick={() => onCancel()}>
            ยกเลิก
          </Button>,
        ]}
        onCancel={() => onCancel()}
      >
        <h3>คำสั่งควบคุม</h3>
        <div>{description}</div>
        <h3>เอกสารแนบ</h3>
        <p
          className={css`
            color: #3364fd;
            cursor: pointer;
          `}
        >
          <PaperClipOutlined />
          พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล
        </p>
      </Modal>
    </>
  );
};
