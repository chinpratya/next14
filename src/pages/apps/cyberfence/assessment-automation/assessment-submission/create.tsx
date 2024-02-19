import { useSetState } from '@mantine/hooks';
import { Card, Form } from 'antd';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

import {
  AssessmentSubmissionRespondentBranchRespondent,
  AssessmentSubmissionSelectAssessmentExtra,
  AssessmentSubmissionSelectAssessmentModalBasicInfo,
  AssessmentSubmissionSelectAssessmentModalDeadline,
  AssessmentSubmissionSelectAssessmentModalRespondent,
  BasicInfoDetail,
  DeadlineDetail,
  SelectedRespondent,
} from '@/features/compliance';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import { StepsBar } from '@components/steps-bar';
import AppLayout from '@layouts/AppLayout';

export const AssessmentSubmissionCreatePage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const [basicInfoDetail, setBasicInfoDetail] =
    useState<BasicInfoDetail>();
  const [respondentDetail, setRespondentDetail] =
    useState<SelectedRespondent>({});
  const [deadlineDetail] = useState<DeadlineDetail>();

  const [state, setState] = useSetState<{
    step: number;
  }>({
    step: 0,
  });

  const nextStep = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    if (
      state.step === 1 &&
      Object.keys(respondentDetail).length === 0
    ) {
      showNotification({
        type: 'error',
        message: 'ต้องมีผู้ตอบแบบประเมินอย่างน้อย 1 คน',
      });
      return;
    }

    if (state.step === 0) setBasicInfoDetail(values);
    setState({ step: state.step + 1 });
  };

  const prevStep = () => {
    if (state.step === 0) {
      router.back();
      return;
    }
    setState({ step: state.step - 1 });
  };

  const getValues = () => {
    const values = form.getFieldsValue();

    const organization = Object.values(respondentDetail);

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
      isSetDt.endDt = endDt.format('YYYY-MM-DD HH:mm:ss');
    }

    let notifications: {
      notiType: string;
      notiDt: string;
    }[] = [];
    if (values.isNotification) {
      notifications = values.notifications.map(
        (item: { notiType: string; notiDt: Dayjs }) => ({
          notiType: item.notiType,
          notiDt: item.notiDt.format(
            'YYYY-MM-DD HH:mm:ss'
          ),
        })
      );
    }

    const scheduleDt: {
      scheduleDt?: string;
    } = {};
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

  return (
    <>
      <PageHeader
        onBack={router.back}
        title="เลือกแบบประเมิน"
        extra={
          <AssessmentSubmissionSelectAssessmentExtra
            form={form}
            onCancel={router.back}
            current={state.step}
            onNext={nextStep}
            onPrevious={prevStep}
            getValues={getValues}
          />
        }
      />
      <StepsBar
        current={state.step}
        items={[
          {
            title: 'ข้อมูลพื้นฐาน',
          },
          {
            title: 'ผู้ตอบแบบประเมิน',
          },
          {
            title: 'กำหนดเวลาส่งแบบประเมิน',
          },
        ]}
      />
      {state.step === 0 && (
        <Card>
          <Form
            form={form}
            key="basicInfoForm"
            layout="vertical"
            initialValues={basicInfoDetail}
          >
            <AssessmentSubmissionSelectAssessmentModalBasicInfo
              form={form}
            />
          </Form>
        </Card>
      )}
      {state.step === 1 && (
        <Card>
          <AssessmentSubmissionSelectAssessmentModalRespondent
            respondentFormValue={respondentDetail}
            setRespondentFormValue={setRespondentDetail}
            key="respondent"
          />
        </Card>
      )}
      {state.step === 2 && (
        <Card>
          <Form
            key="deadlineForm"
            form={form}
            layout="vertical"
            initialValues={deadlineDetail}
          >
            <AssessmentSubmissionSelectAssessmentModalDeadline
              form={form}
            />
          </Form>
        </Card>
      )}
    </>
  );
};

AssessmentSubmissionCreatePage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default AssessmentSubmissionCreatePage;
