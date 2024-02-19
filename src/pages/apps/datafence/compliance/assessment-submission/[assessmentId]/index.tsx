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
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { TitleHeader } from '@components/title-header';
import { IntlMessage } from '@utilComponents/intl-message';

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
      label: (
        <IntlMessage id="compliance.assessmentSubmission.detail.basicInfo" />
      ),
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
      label: (
        <IntlMessage id="compliance.assessmentSubmission.detail.respondent" />
      ),
      key: 'respondents',
      children: (
        <AssessmentSubmissionRespondent
          assessmentId={assessmentId}
          assessmentStatus={assessmentStatus}
        />
      ),
    },
    {
      label: (
        <IntlMessage id="compliance.assessmentSubmission.detail.setting" />
      ),
      key: 'setting',
      children: (
        <AssessmentSubmissionSettings
          assessmentId={assessmentId}
          assessmentStatus={assessmentStatus}
          data={assessmentSubmissionSetting}
        />
      ),
    },
    {
      label: (
        <Typography.Text
          disabled={isDisableReport}
          className={css`
            color: unset;
          `}
        >
          <IntlMessage id="compliance.assessmentSubmission.detail.assessmentReport" />
          <Tooltip
            title={
              <IntlMessage id="compliance.assessmentSubmission.detail.assessmentReport.tooltip" />
            }
          >
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
        toggle.change();
        setIsFormUpdate(false);
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
          <PermissionWrapper
            moduleName={'compliance'}
            policies={[
              permissions[
                'pdpakit:compliance:submission:update'
              ],
            ]}
          >
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
          </PermissionWrapper>
        }
        title={
          <TitleHeader
            title={
              <IntlMessage id="compliance.assessmentSubmission.detail.title" />
            }
            icon={<ContainerOutlined />}
            meta={{
              'assessment submission': (
                <IntlMessage id="compliance.assessmentSubmission.detail.assessmentSubmission" />
              ),
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
        <Card
          title={
            <IntlMessage id="compliance.assessmentSubmission.detail" />
          }
        >
          <Descriptions
            layout="vertical"
            labelStyle={{ fontWeight: 'bold' }}
          >
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.name" />
              }
            >
              {data?.name}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.assessmentName" />
              }
            >
              {data?.assessmentName}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondentCount" />
              }
            >
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
        loading={
          updateAssessmentSubmissionDetail.isLoading
        }
      />
    </FallbackError>
  );
};

AssessmentSubmissionDetailPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default AssessmentSubmissionDetailPage;
