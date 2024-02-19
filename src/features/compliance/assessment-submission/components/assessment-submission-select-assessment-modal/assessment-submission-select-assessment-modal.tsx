import { css } from '@emotion/css';
import { Divider, Form, Modal, Steps } from 'antd';
import { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

import { useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import {
  BasicInfoDetail,
  DeadlineDetail,
  SelectedRespondent,
} from '../../types';
import { AssessmentSubmissionRespondentBranchRespondent } from '../../types';
import { AssessmentSubmissionConfirmModal } from '../assessment-submission-confirm-modal';
import { AssessmentSubmissionSelectAssessmentModalBasicInfo } from '../assessment-submission-select-assessment-modal-basic-info';
import { AssessmentSubmissionSelectAssessmentModalDeadline } from '../assessment-submission-select-assessment-modal-deadline';
import { AssessmentSubmissionSelectAssessmentModalRespondent } from '../assessment-submission-select-assessment-modal-respondent';

import { AssessmentSubmissionSelectAssessmentModalFooter } from './assessment-submission-select-assessment-modal-footer';

export type SystemAndServiceStorageDeviceLocationModalProps =
  {
    open: boolean;
    onCancel: () => void;
  };

export const AssessmentSubmissionSelectAssessmentModal =
  ({
    open,
    onCancel,
  }: SystemAndServiceStorageDeviceLocationModalProps) => {
    const [form] = Form.useForm();
    const toggle = useToggle();
    const { showNotification } = useNotifications();

    const [current, setCurrent] = useState(0);
    const [basicInfoDetail, setBasicInfoDetail] =
      useState<BasicInfoDetail>();
    const [respondentDetail, setRespondentDetail] =
      useState<SelectedRespondent>({});
    const [deadlineDetail, setDeadlineDetail] =
      useState<DeadlineDetail>();

    const forms = [
      <Form
        form={form}
        key="basicInfoForm"
        layout="vertical"
        initialValues={basicInfoDetail}
      >
        <AssessmentSubmissionSelectAssessmentModalBasicInfo
          form={form}
        />
      </Form>,
      <AssessmentSubmissionSelectAssessmentModalRespondent
        respondentFormValue={respondentDetail}
        setRespondentFormValue={setRespondentDetail}
        key="respondent"
      />,
      <Form
        key="deadlineForm"
        form={form}
        layout="vertical"
        initialValues={deadlineDetail}
      >
        <AssessmentSubmissionSelectAssessmentModalDeadline
          form={form}
        />
      </Form>,
    ];

    const stepItems = [
      {
        title: 'Step 1',
        description: 'ข้อมูลพื้นฐาน',
      },
      {
        title: 'Step 2',
        description: 'ผู้ตอบแบบประเมิน',
      },
      {
        title: 'Step 3',
        description: 'กำหนดเวลาส่งแบบประเมิน',
      },
    ];

    const getValues = () => {
      const values = form.getFieldsValue();

      const organization = Object.values(
        respondentDetail
      );

      let respondents: {
        orgID: string;
        respondentID: string;
      }[] = [];

      if (organization.length > 0) {
        for (const org of organization) {
          const branchRespondent: AssessmentSubmissionRespondentBranchRespondent[] =
            [];
          Object.values(org.branchs).forEach((item) => {
            branchRespondent.push(...item.respondents);
          });

          const filter = branchRespondent
            .filter((item) => item.active !== false)
            .map((item) => ({
              orgID: org.id,
              respondentID: item.ObjectUUID,
            }));

          respondents = [...respondents, ...filter];
        }
      }

      const isSetDt: {
        startDt?: string;
        endDt?: string;
      } = {};
      if (values.isSetDt) {
        const [startDt, endDt] = values.dateDt;
        isSetDt.startDt = startDt.format(
          'YYYY-MM-DD HH:mm:ss'
        );
        isSetDt.endDt = endDt.format(
          'YYYY-MM-DD HH:mm:ss'
        );
      }

      let notifications: {
        notiType: string;
        notiDt: string;
      }[] = [];
      if (values.isNotification) {
        notifications = values.notifications.map(
          (item: {
            notiType: string;
            notiDt: Dayjs;
          }) => ({
            notiType: item.notiType,
            notiDt: item.notiDt.format(
              'YYYY-MM-DD HH:mm:ss'
            ),
          })
        );
      }

      const scheduleDt: { scheduleDt?: string } = {};
      if (values.isSchedule) {
        scheduleDt.scheduleDt = values.scheduleDt.format(
          'YYYY-MM-DD HH:mm:ss'
        );
      }

      return {
        ...values,
        ...isSetDt,
        ...scheduleDt,
        ...basicInfoDetail,
        notifications,
        respondents,
      };
    };

    const onNext = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();

      if (
        current === 1 &&
        Object.keys(respondentDetail).length === 0
      ) {
        showNotification({
          type: 'error',
          message: 'ต้องมีผู้ตอบแบบประเมินอย่างน้อย 1 คน',
        });
        return;
      }

      if (current === 0) setBasicInfoDetail(values);
      setCurrent((prev) => prev + 1);
    };

    const onPrevious = () => {
      if (current === 0) {
        toggle.reset();
        return;
      }
      setCurrent((state) => state - 1);
    };

    const resetValue = useCallback(() => {
      setCurrent(0);
      setBasicInfoDetail(undefined);
      setRespondentDetail({});
      setDeadlineDetail(undefined);
      form.resetFields();
    }, [form]);

    useEffect(() => {
      if (!open) resetValue();
    }, [form, open, resetValue]);

    return (
      <>
        <Modal
          title="เลือกแบบประเมิน"
          open={open}
          width="75vw"
          className={css`
            .ant-modal-body {
              height: 70vh;
              overflow-y: scroll;
            }
          `}
          footer={
            <AssessmentSubmissionSelectAssessmentModalFooter
              form={form}
              onCancel={onCancel}
              current={current}
              onNext={onNext}
              onPrevious={onPrevious}
              getValues={getValues}
            />
          }
          onCancel={toggle.reset}
          centered
          destroyOnClose
          afterClose={resetValue}
        >
          <Steps
            current={current}
            items={stepItems}
            className="mb-4"
          />
          <Divider />
          {forms[current]}
        </Modal>

        <AssessmentSubmissionConfirmModal
          header="คุณต้องการที่จะออกจากหน้านี้ โดยไม่บันทึกหรือไม่"
          message="หากคุณออกจากนี้ ข้อมูลที่กรอกจะไม่ถูกบันทึก และไม่สามารถนำข้อมูลนั้นกลับมาได้"
          open={toggle.openReset}
          onCancel={toggle.reset}
          onSubmit={() => {
            toggle.reset();
            resetValue();
            onCancel();
          }}
        />
      </>
    );
  };
