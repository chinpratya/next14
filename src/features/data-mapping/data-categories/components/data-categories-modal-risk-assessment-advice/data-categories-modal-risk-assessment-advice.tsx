import { css } from '@emotion/css';
import { Button } from 'antd';

import { Modal } from '@components/modal';

type ModalRiskAssessmentAdviceProps = {
  open: boolean;
  onClose: () => void;
};
export const DataCategoriesModalRiskAssessmentAdvice = ({
  open,
  onClose,
}: ModalRiskAssessmentAdviceProps) => {
  return (
    <Modal
      title="คำแนะนำการประเมินความเสี่ยง"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
      width={800}
    >
      <div
        className={css`
          width: 100%;
          font-family: 'Roboto';
        `}
      >
        <h4>ขั้นตอนการประเมินความเสี่ยง</h4>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            min-height: 50px;
            padding-top: 10px;
            padding-left: 10px;
            background: #f1f3f4;
            margin: 20px 0;
          `}
        >
          <p>
            {
              '1. การระบุความเสี่ยง (Risk identification) => สถานการณ์ความเสี่ยง'
            }
          </p>
          <p>
            {
              '2. การวิเคราะห์ความเสี่ยง (Risk analysis) => โอกาสเกิดและผลกระทบ'
            }
          </p>
          <p>
            {
              '3. การคำนวณคะแนนความเสี่ยง (Calculating risk score) คูณคะแนน โอกาสเกิด X ผลกระทบ'
            }
          </p>
        </div>
        <h4>การระบุความเสี่ยง (Risk identification) </h4>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            min-height: 50px;
            padding-top: 10px;
            padding-left: 10px;
            background: #f1f3f4;
            margin: 20px 0;
          `}
        >
          <p>
            การระบุความเสี่ยงเป็นกระบวนการที่ดำเนินการเป็นวงจรแบบต่อเนื่องในขณะที่ประเมินความเสี่ยง
            ความเสี่ยงบางอย่างจะระบุได้ง่าย (เช่น
            ความเสี่ยงที่ทราบอยู่แล้ว)
            ในขณะที่มีความเสี่ยง
            บางอย่างที่ต้องใช้ความพยายามในการค้นพบ
          </p>
        </div>
        <h4>การวิเคราะห์ความเสี่ยง (Risk analysis) </h4>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            min-height: 50px;
            padding-top: 10px;
            padding-left: 10px;
            background: #f1f3f4;
            margin: 20px 0;
          `}
        >
          <p>
            เป็นขั้นตอนหลังจากการระบุความเสี่ยงให้ทำการวิเคราะห์ความเสี่ยงที่ระบุได้แต่ลรายการ
            และทำความเข้าใจกับภัยคุกคามที่อาจเกิดขึ้นเกิดขึ้นกับองค์กร
            (สำหรับกรณีข้อมูลส่วนบุคคล คือ
            ภัยคุกคามที่อาจส่งผลต่อองค์กรหากเกิดการละเมิดข้อมูลส่วนบุคคล)
            การวิเคราะห์ความเสี่ยงช่วยให้องค์กรสามารถคำนวณความน่าจะเป็นหรือโอกาสเกิดภัยคุกคามและผลกระทบที่อาจเกิดขึ้นได้
            โดยสามารถนำที่วิเคราะห์ได้จากขั้นตอนนี้แจ้งการตัดสินใจเกี่ยวกับการปรับใช้มาตรการรับมือที่เหมาะสมเพื่อลดความเสี่ยง
          </p>
        </div>
        <h4>การคำนวณคะแนนความเสี่ยง (Risk scoring)</h4>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            min-height: 50px;
            padding-top: 10px;
            padding-left: 10px;
            background: #f1f3f4;
            margin: 20px 0;
          `}
        >
          <p>
            จะคำนวณโดยการคูณคะแนนโอกาสเกิดและผลกระทบของความเสี่ยง
          </p>
        </div>
      </div>
    </Modal>
  );
};
