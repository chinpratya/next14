import { Button, Card, Collapse, Form, Tabs } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
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
  useGetActivity,
  ActivityActorList,
  ActivityDisclosureActorList,
  ActivityPreviewData,
  ActivityDpiaForm,
  useGetActivityDpia,
  useUpdateActivityDPIA,
  ActivityDisclosurePurposeList,
  useGetActivityDpiaInit,
  useGetDataLifecycleByActivity,
  DataLifecycleDescription,
  DataLifecycleFlow,
  DataLifecycleBoards,
  DataLifecycleCreate,
  useUpdateActivity,
  useUpdateActivityCollect,
  ActivityDetailConsentList,
  ActivityDetailDsarList,
  ActivityCollectRightsAndMethodAccessPersonalInformation,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

type ActivityDetailTabProps = {
  activityId?: string;
  form: FormInstance;
};

const ActivityDetailTab = ({
  form,
  activityId,
}: ActivityDetailTabProps) => {
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
  if (!activityId) {
    return null;
  }

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

type DataLifeCycleProps = {
  activityId: string;
};

const DataLifeCycle = ({
  activityId,
}: DataLifeCycleProps) => {
  const { data, isLoading, isError } =
    useGetDataLifecycleByActivity({
      activityId,
    });

  if (isLoading) return <Loading />;

  if (isError || !data) {
    return (
      <DataLifecycleCreate activityId={activityId} />
    );
  }

  return (
    <>
      <DataLifecycleDescription data={data} />
      <DataLifecycleFlow
        dataLifecycleId={data.dataLifeCycleID}
      />
      <DataLifecycleBoards
        dataLifecycleId={data.dataLifeCycleID}
      />
    </>
  );
};

type DPIAProps = {
  activityId: string;
  form: FormInstance;
};

const DPIA = ({ activityId, form }: DPIAProps) => {
  const { data, isLoading, isError } = useGetActivityDpia(
    { activityId }
  );

  const init = useGetActivityDpiaInit({
    activityId,
    enabled: data?.lastUpdatedDt === null,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        ...init?.data,
      });
    }
  }, [data, form, init]);

  return (
    <FallbackError isError={isError || init.isError}>
      <Card loading={isLoading || init.isLoading}>
        <ActivityDpiaForm form={form} />
      </Card>
    </FallbackError>
  );
};

const ActivityDetailPage = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const router = useRouter();
  const toggle = useToggle();

  const activityId = router.query.activityId as string;
  const { data, isLoading, isError } = useGetActivity({
    activityId,
  });
  const [tabsKey, setTabsKey] = useState('detail');
  const [form] = Form.useForm();

  const updateActivity = useUpdateActivity({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.update'
        ) as string,
      });
    },
    activityId,
  });

  const updateActivityCollect = useUpdateActivityCollect({
    activityId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.collect.update'
        ) as string,
      });
    },
  });

  const updateDPIA = useUpdateActivityDPIA({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.dpia.update'
        ) as string,
      });
    },
    activityId,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const handleUpdateActivity = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    switch (tabsKey) {
      case 'dpia':
        updateDPIA.submit(values);
        break;
      case 'detail':
        updateActivity.submit(values);
        break;
      case 'collect':
        updateActivityCollect.submit(values);
        break;
      default:
        break;
    }
  };
  const onChangTabs = (key: string) => {
    setTabsKey(key);
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="dataMapping.activity.detail.title" />
        }
        subtitle={data?.name}
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:activity:update'
              ],
            ]}
          >
            <Button
              onClick={() => toggle.preview()}
              className="mr-2"
            >
              <IntlMessage id="dataMapping.activity.preview" />
            </Button>
            {tabsKey === 'detail' ||
            tabsKey === 'collect' ||
            tabsKey === 'dpia' ? (
              <Button
                type="primary"
                onClick={handleUpdateActivity}
                loading={
                  updateDPIA.isLoading ||
                  updateActivity.isLoading ||
                  updateActivityCollect.isLoading
                }
              >
                <IntlMessage id="dataMapping.activity.save" />
              </Button>
            ) : null}
          </PermissionWrapper>
        }
        overlap
      />
      <Tabs
        destroyInactiveTabPane
        activeKey={tabsKey}
        onChange={onChangTabs}
        items={[
          {
            key: 'detail',
            label: (
              <IntlMessage id="dataMapping.activity.activityDetail" />
            ),
            children: (
              <ActivityDetailTab
                form={form}
                activityId={activityId}
              />
            ),
          },
          {
            key: 'data-categories',
            label: (
              <IntlMessage id="dataMapping.activity.dataCategory" />
            ),
            children: (
              <DataCategory activityId={activityId} />
            ),
          },
          {
            key: 'lawful-basis',
            label: (
              <IntlMessage id="dataMapping.activity.lawfulBasis" />
            ),
            children: (
              <LawfulBasis activityId={activityId} />
            ),
          },
          {
            key: 'collect',
            label: (
              <IntlMessage id="dataMapping.activity.collect" />
            ),
            children: (
              <Collect
                activityId={activityId}
                form={form}
              />
            ),
          },
          {
            key: 'use-and-public',
            label: (
              <IntlMessage id="dataMapping.activity.useAndPublic" />
            ),
            children: (
              <UseAndPublish
                activityId={activityId}
                form={form}
              />
            ),
          },
          {
            key: 'data-lifecycle',
            label: (
              <IntlMessage id="dataMapping.activity.dataLifecycle" />
            ),
            children: (
              <DataLifeCycle activityId={activityId} />
            ),
          },
          {
            key: 'dpia',
            label: (
              <IntlMessage id="dataMapping.activity.dpia" />
            ),
            children: (
              <DPIA activityId={activityId} form={form} />
            ),
          },
          {
            key: 'consent',
            label: (
              <IntlMessage id="dataMapping.activity.consent" />
            ),
            children: (
              <ActivityDetailConsentList
                activityId={activityId}
              />
            ),
          },
          {
            key: 'dsar',
            label: (
              <IntlMessage id="dataMapping.activity.dsar" />
            ),
            children: (
              <ActivityDetailDsarList
                activityId={activityId}
              />
            ),
          },
        ]}
      />
      <ActivityPreviewData
        activityId={activityId}
        open={toggle.openPreview}
        onClose={() => toggle.preview()}
      />
    </FallbackError>
  );
};

ActivityDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default ActivityDetailPage;
