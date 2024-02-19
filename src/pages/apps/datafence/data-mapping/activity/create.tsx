import { useSetState } from '@mantine/hooks';
import { Button, Card, Form, Collapse } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActivityCollectDataRetentionList,
  ActivityCollectForm,
  ActivityCollectImportChannelList,
  ActivityCollectPurposeList,
  ActivityDetail,
  ActivityPurposeLists,
  ActivityDataUsage,
  ActivityDataUsageDetail,
  ActivityDisclosure,
  ActivityDataCategoryList,
  ActivityLawfulBasisLegalBasis,
  ActivityLawfulBasisRightsOfDataSubjects,
  ActivityPreviewData,
  useCreateActivity,
  useGetActivity,
  useUpdateActivity,
  ActivityActorList,
  useUpdateActivityCollect,
  ActivityDisclosureActorList,
  ActivityDisclosurePurposeList,
  useActivityPublish,
  ActivityCollectRightsAndMethodAccessPersonalInformation,
} from '@/features/data-mapping';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { StepsBar } from '@components/steps-bar';
import { IntlMessage } from '@utilComponents/intl-message';

type ActivityDetailStepProps = {
  activityId?: string;
  form: FormInstance;
};

const ActivityDetailStep = ({
  activityId,
  form,
}: ActivityDetailStepProps) => {
  const actorType = Form.useWatch('activityType', form);

  return (
    <>
      <ActivityDetail form={form} />
      {activityId && (
        <>
          <ActivityActorList
            activityId={activityId}
            actorType={actorType}
          />
          <ActivityActorList
            activityId={activityId}
            actorType="data-protection-officer"
          />
          <ActivityActorList
            activityId={activityId}
            actorType="receipt"
          />
        </>
      )}
    </>
  );
};

type DataCategoryProps = {
  activityId?: string;
};

const DataCategory = ({
  activityId,
}: DataCategoryProps) => {
  if (!activityId) return null;
  return (
    <ActivityDataCategoryList activityId={activityId} />
  );
};

type LawfulBasisProps = {
  activityId: string;
};

const LawfulBasis = ({
  activityId,
}: LawfulBasisProps) => {
  return (
    <>
      <ActivityLawfulBasisLegalBasis
        activityId={activityId}
      />
      <ActivityLawfulBasisRightsOfDataSubjects
        activityId={activityId}
      />
    </>
  );
};

type CollectProps = {
  activityId: string;
  form: FormInstance;
};

const Collect = ({ activityId, form }: CollectProps) => {
  return (
    <Card
      title={
        <IntlMessage id="dataMapping.activity.collect.title" />
      }
    >
      <ActivityCollectPurposeList
        activityId={activityId}
      />
      <ActivityCollectImportChannelList
        activityId={activityId}
      />
      <ActivityCollectDataRetentionList
        activityId={activityId}
      />
      <ActivityCollectForm
        activityId={activityId}
        form={form}
      />
      <ActivityCollectRightsAndMethodAccessPersonalInformation
        activityId={activityId}
      />
    </Card>
  );
};

type UseAndPublishProps = {
  activityId?: string;
  form: FormInstance;
};

const UseAndPublish = ({
  activityId,
  form,
}: UseAndPublishProps) => {
  const isDisclosure = Form.useWatch(
    'isDisclosure',
    form
  );
  const isUsage = Form.useWatch('isUsageData', form);

  if (!activityId) return null;
  return (
    <Card>
      <ActivityPurposeLists activityId={activityId} />
      <ActivityDataUsage
        activityId={activityId}
        form={form}
      />
      {isUsage && (
        <ActivityDataUsageDetail
          activityId={activityId}
        />
      )}
      <ActivityDisclosure
        activityId={activityId}
        form={form}
      />
      {isDisclosure && (
        <Collapse defaultActiveKey={['data-destination']}>
          <Collapse.Panel
            header={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.header" />
            }
            key="data-destination"
          >
            <ActivityDisclosureActorList
              activityId={activityId}
            />
            <ActivityDisclosurePurposeList
              activityId={activityId}
            />
          </Collapse.Panel>
        </Collapse>
      )}
    </Card>
  );
};

const ActivityCreatePage = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const router = useRouter();
  const toggle = useToggle();
  const [state, setState] = useSetState<{
    visited: boolean;
    step: number;
    isNext: boolean;
    isSetForm: boolean;
  }>({
    visited: false,
    step: 0,
    isNext: false,
    isSetForm: false,
  });

  const activityId = location.hash.replace('#', '');
  const activity = useGetActivity({
    activityId,
  });

  const [form] = Form.useForm();
  const publishActivity = useActivityPublish({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.publish'
        ) as string,
      });
      router.push(
        '/apps/datafence/data-mapping/activity'
      );
    },
  });
  const createActivity = useCreateActivity({
    onSuccess: (activityId: string) => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.create'
        ) as string,
      });
      router.push({
        hash: activityId,
      });
    },
  });

  const updateActivity = useUpdateActivity({
    activityId,
    onSuccess: () => {
      if (state.isNext) {
        setState({ isNext: false, step: state.step + 1 });
      }
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.update'
        ) as string,
      });
    },
  });
  const updateActivityCollect = useUpdateActivityCollect({
    activityId,
    onSuccess: () => {
      if (state.isNext) {
        setState({ isNext: false, step: state.step + 1 });
      }
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.collect.update'
        ) as string,
      });
    },
  });

  useEffect(() => {
    if (activity.isError) {
      router.push({
        hash: '',
      });
      setState({ step: 0 });
    }
  }, [activity.isError, router, setState]);

  useEffect(() => {
    if (activity && !state.isSetForm) {
      form.setFieldsValue({ ...activity.data });
      setState({
        isSetForm: true,
      });
    }
  }, [activity, form, setState, state]);

  if (activity.isLoading && !state.visited) {
    return <Loading cover="content" />;
  }

  state.visited = true;
  const handleCreateActivity = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    createActivity.submit(values);
  };

  const handleUpdateActivity = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    switch (state.step) {
      case 0:
        updateActivity.submit(values);
        break;
      case 3:
        updateActivityCollect.submit(values);
        break;
      case 4:
        router.push(
          '/apps/datafence/data-mapping/activity'
        );

        break;
      default:
        setState({
          isNext: false,
          step: state.step + 1,
        });
    }
  };

  const handlePublishActivity = async () => {
    await form.validateFields();
    publishActivity.submit(activityId);
  };
  return (
    <>
      <PageHeader
        onBack={
          state.step !== 0
            ? () => setState({ step: state.step - 1 })
            : router.back
        }
        title={
          <IntlMessage id="dataMapping.activity.create.title" />
        }
        extra={
          !activityId ? (
            <Button
              type="primary"
              onClick={handleCreateActivity}
              loading={createActivity.isLoading}
            >
              <IntlMessage id="dataMapping.activity.save" />
            </Button>
          ) : (
            <>
              <Button
                onClick={() => toggle.preview()}
                hidden={state.step !== 4}
              >
                <IntlMessage id="dataMapping.activity.preview" />
              </Button>
              {state.step !== 0 ? (
                <Button
                  onClick={async () => {
                    setState({ step: state.step - 1 });
                  }}
                >
                  <IntlMessage id="dataMapping.activity.back" />
                </Button>
              ) : null}
              <Button
                onClick={async () => {
                  setState({ isNext: false });
                  await handleUpdateActivity();
                }}
                loading={
                  (updateActivity.isLoading &&
                    !state.isNext) ||
                  (updateActivityCollect.isLoading &&
                    !state.isNext)
                }
              >
                <IntlMessage id="dataMapping.activity.save" />
              </Button>
              {state.step !== 4 ? (
                <Button
                  type="primary"
                  onClick={async () => {
                    setState({ isNext: true });
                    await handleUpdateActivity();
                  }}
                  loading={
                    (updateActivity.isLoading &&
                      state.isNext) ||
                    (updateActivityCollect.isLoading &&
                      state.isNext)
                  }
                >
                  <IntlMessage id="dataMapping.activity.next" />
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={async () =>
                    await handlePublishActivity()
                  }
                  loading={publishActivity.isLoading}
                >
                  <IntlMessage id="dataMapping.activity.finish" />
                </Button>
              )}
            </>
          )
        }
      />
      <StepsBar
        current={state.step}
        items={[
          {
            title: (
              <IntlMessage id="dataMapping.activity.activityDetail" />
            ),
          },
          {
            title: (
              <IntlMessage id="dataMapping.activity.dataCategory" />
            ),
          },
          {
            title: (
              <IntlMessage id="dataMapping.activity.lawfulBasis" />
            ),
          },
          {
            title: (
              <IntlMessage id="dataMapping.activity.collect" />
            ),
          },
          {
            title: (
              <IntlMessage id="dataMapping.activity.useAndPublic" />
            ),
          },
        ]}
      />
      {state.step === 0 && (
        <ActivityDetailStep
          activityId={activityId}
          form={form}
        />
      )}
      {state.step === 1 && (
        <DataCategory activityId={activityId} />
      )}
      {state.step === 2 && (
        <LawfulBasis activityId={activityId} />
      )}
      {state.step === 3 && (
        <Collect activityId={activityId} form={form} />
      )}
      {state.step === 4 && (
        <UseAndPublish
          activityId={activityId}
          form={form}
        />
      )}
      <ActivityPreviewData
        activityId={activityId}
        open={toggle.openPreview}
        onClose={() => toggle.preview()}
      />
    </>
  );
};

ActivityCreatePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default ActivityCreatePage;
