import {
  ContainerOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Card,
  Descriptions,
  Form,
  FormInstance,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import {
  AssessmentSubmissionBasicInfo,
  // AssessmentSubmissionRankingReport,
  AssessmentSubmissionRespondent,
  AssessmentSubmissionSettings,
  useGetAssessmentSubmission,
  AssessmentSubmissionReport,
  AssessmentSubmissionDetailExtra,
  AssessmentSubmissionChangeTabModal,
  useUpdateAssessmentSubmissionDetail,
  useGetAssessmentSubmissionSetting,
  AssessmentSubmissionSetting,
} from '@/features/compliance';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { TitleHeader } from '@components/title-header';

type AssessmentSubmissionDetailPageProps = {
  form: FormInstance;
  assessmentId: string;
  assessmentStatus: string;
  assessmentSubmissionSetting?: AssessmentSubmissionSetting;
  onChangeFormValue: () => void;
};

const getAssessmentSubmissionDetailTabs = ({
  form,
  assessmentId,
  assessmentStatus,
  assessmentSubmissionSetting,
  onChangeFormValue,
}: AssessmentSubmissionDetailPageProps) => {
  const isDisableReport = assessmentStatus !== 'success';
  return [
    {
      label: 'ข้อมูลพื้นฐาน',
      key: 'basicInfo',
      children: (
        <AssessmentSubmissionBasicInfo
          form={form}
          assessmentStatus={assessmentStatus}
          onChangeFormValue={onChangeFormValue}
        />
      ),
    },
    {
      label: 'รายชื่อผู้ทำแบบประเมิน',
      key: 'respondents',
      children: (
        <AssessmentSubmissionRespondent
          assessmentId={assessmentId}
          assessmentStatus={assessmentStatus}
        />
      ),
    },
    {
      label: 'ตั้งค่า',
      key: 'setting',
      children: (
        <AssessmentSubmissionSettings
          assessmentId={assessmentId}
          assessmentStatus={assessmentStatus}
          data={assessmentSubmissionSetting}
        />
      ),
    },
    // {
    //   label: 'อันดับ',
    //   key: 'rangking',
    //   children: (
    //     <AssessmentSubmissionRankingReport
    //       assessmentId={assessmentId}
    //     />
    //   ),
    // },
    {
      label: (
        <Typography.Text
          disabled={isDisableReport}
          className={css`
            color: unset;
          `}
        >
          รายงานการประเมิน
          <Tooltip title="การประเมินที่ถูกปฏิเสธหรือยกเลิก จะไม่นำมาคำนวณคะแนน">
            <InfoCircleOutlined
              className={css`
                margin-left: 5px;
                font-size: 12px;
              `}
            />
          </Tooltip>
        </Typography.Text>
      ),
      disabled: isDisableReport,
      key: 'assessmentReport',
      children: (
        <AssessmentSubmissionReport
          assessmentId={assessmentId}
        />
      ),
    },
  ];
};

const AssessmentSubmissionDetailPage = () => {
  const router = useRouter();
  const toggle = useToggle();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const [currentTab, setCurrentTab] =
    useState('basicInfo');
  const [isFormUpdate, setIsFormUpdate] = useState(false);
  const onChangeFormValue = () => setIsFormUpdate(true);

  const assessmentId = router.query
    .assessmentId as string;

  const { data, isError, isLoading } =
    useGetAssessmentSubmission(assessmentId);

  const assessmentSubmissionSetting =
    useGetAssessmentSubmissionSetting(assessmentId);

  const updateAssessmentSubmissionDetail =
    useUpdateAssessmentSubmissionDetail({
      assessmentSubmissionId: assessmentId,
      onSuccess: () => {
        showNotification({
          message: 'บันทึกข้อมูลสำเร็จ',
          type: 'success',
        });
        setCurrentTab(toggle.data.key);
      },
    });

  const onChangeCurrentTab = (key: string) => {
    if (
      currentTab !== 'basicInfo' ||
      data?.status !== 'draft'
    ) {
      setCurrentTab(key);
      return;
    }

    if (isFormUpdate) toggle.change({ key });
    else setCurrentTab(key);
  };

  const onSetFormUpdate = (value: boolean) =>
    setIsFormUpdate(value);

  const onCancelChangeTabModal = () => {
    toggle.change();
    form.setFieldsValue(data);
    setIsFormUpdate(false);
    setCurrentTab(toggle.data.key);
  };

  const onSubmitChangeTab = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateAssessmentSubmissionDetail.submit({
      name: values.name,
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
    return () => {
      form.resetFields();
    };
  }, [data, form]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        extra={
          <AssessmentSubmissionDetailExtra
            form={form}
            currentTab={currentTab}
            assessmentId={assessmentId}
            onSetFormUpdate={onSetFormUpdate}
            assessmentSetting={
              assessmentSubmissionSetting.data
            }
            assessmentStatus={data?.status as string}
          />
        }
        title={
          <TitleHeader
            title="รายละเอียดแบบประเมิน"
            icon={<ContainerOutlined />}
            meta={{
              'assessment submission':
                'รายการส่งแบบประเมิน',
              assessmentId: data?.name,
            }}
            tabKeys={['basicInfo']}
          />
        }
      />
      <div
        id="assessmentHeader"
        style={{
          padding: 24,
          margin: -24,
        }}
      >
        <Card title="ข้อมูลพื้นฐาน">
          <Descriptions
            layout="vertical"
            labelStyle={{ fontWeight: 'bold' }}
          >
            <Descriptions.Item label="ชื่อการประเมิน">
              {data?.name}
            </Descriptions.Item>
            <Descriptions.Item label="ชื่อแบบประเมิน">
              {data?.assessmentName}
            </Descriptions.Item>
            <Descriptions.Item label="จำนวนผู้ทำแบบประเมิน">
              {data?.respondentCount}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <Card>
        <Tabs
          onChange={onChangeCurrentTab}
          activeKey={currentTab}
          defaultActiveKey="assessmentReport"
          items={getAssessmentSubmissionDetailTabs({
            form,
            assessmentId,
            assessmentStatus: data?.status as string,
            assessmentSubmissionSetting:
              assessmentSubmissionSetting.data,
            onChangeFormValue: onChangeFormValue,
          })}
        />
      </Card>

      <AssessmentSubmissionChangeTabModal
        open={toggle.openChange}
        currentTab={currentTab}
        onOk={onSubmitChangeTab}
        onClose={toggle.change}
        onCancel={onCancelChangeTabModal}
      />
    </FallbackError>
  );
};

AssessmentSubmissionDetailPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default AssessmentSubmissionDetailPage;
