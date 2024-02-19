import { Card, Tabs, Form, Dropdown, Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CollectionPointBuilder,
  CollectionPointDescription,
  useGetCollectionPoint,
  ConsentCollectionPointDetail,
  CollectionPointBasicInfo,
  CollectionPointSetting,
  CollectionPointVersion,
  useUpdateCollectionPoint,
  useUpdateCollectionPointPreview,
  useUpdateCollectionPointPrivacyNotice,
  useListCollectionPointPolicy,
  CollectionPointTranslate,
  CollectionPointGetScript,
  CollectionPointPreview,
} from '@/features/consent-management';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const CollectionPointDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotifications();
  const toggle = useToggle();

  const collectionPointId = router.query
    .collectionPointId as string;
  const [keyTab, setKeyTab] = useState('basic-info');
  const [form] = Form.useForm();

  const { data, isLoading, isError } =
    useGetCollectionPoint(collectionPointId);

  const updateBaseInfo = useUpdateCollectionPoint({
    collectionPointId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'consentManagement.notification.collectionPoint.update'
        ) as string,
      });
    },
  });

  const updateBuilder = useUpdateCollectionPointPreview({
    collectionPointId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'consentManagement.notification.collectionPoint.update'
        ) as string,
      });
    },
  });

  const updateSetting =
    useUpdateCollectionPointPrivacyNotice({
      collectionPointId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'consentManagement.notification.collectionPoint.update'
          ) as string,
        });
      },
    });

  const consentBuilderStore = useConsentBuilderStore();

  const { data: policyList } =
    useListCollectionPointPolicy();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onUpdate = (
    isPublish?: boolean,
    isNewVersion?: boolean
  ) => {
    switch (keyTab) {
      case 'builder':
        const { formItems, formSetting } =
          consentBuilderStore;
        updateBuilder.submit({
          isPublish,
          isNewVersion,
          form: {
            formItems,
            formSetting,
          },
        });
        return;
      case 'setting':
        const value = {
          isPublish,
          isNewVersion,
          isprivacyNotice: false,
          policyTypeID: '',
          privacyName: '',
          relatePrivacyNoticeID: '',
          displayID: '',
          linkPrivacy: '',
          privacyVersion: '',
          UrlPolicy: '',
          ...form.getFieldsValue(),
        };
        updateSetting.submit(value);
        return;
      default:
        const values = form.getFieldsValue();
        const policy = policyList?.find(
          (item) => item.ObjectUUID === values.policyId
        );
        const policyName = policy?.name;
        const policyLink = `https://api.onefence.co/policy/v1/policy/html/${policy?.ObjectUUID}`;
        const policyVersion = policy?.version;
        const basicInfo = {
          isPublish,
          isNewVersion,
          policyName: policyName ?? '',
          policyLink: policyLink ?? '',
          policyVersion: policyVersion ?? '',
          policyId: policy?.ObjectUUID ?? '',
          ...form.getFieldsValue(),
        };
        updateBaseInfo.submit(basicInfo);
        return;
    }
  };

  if (isLoading) return <Loading cover="content" />;

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="consentManagement.collectionPoint.detail.title" />
        }
        subtitle={data?.name}
        extra={
          <>
            <Button onClick={() => toggle.getScript()}>
              <IntlMessage id="consentManagement.collectionPoint.getScript" />
            </Button>
            <Button onClick={() => toggle.preview()}>
              <IntlMessage id="consentManagement.collectionPoint.preview" />
            </Button>
            <PermissionWrapper
              moduleName={'consent'}
              policies={[
                permissions[
                  'pdpakit:consent:collectionpoint:update'
                ],
              ]}
            >
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <IntlMessage id="consentManagement.collectionPoint.detail.save.draft" />
                      ),
                      key: 'Draft',
                      onClick: () => onUpdate(false),
                    },
                    {
                      label: (
                        <IntlMessage id="consentManagement.collectionPoint.detail.save.publish.version" />
                      ),
                      key: 'Publish',
                      onClick: () =>
                        onUpdate(true, false),
                    },
                    {
                      label: (
                        <IntlMessage id="consentManagement.collectionPoint.detail.save.publish.newVersion" />
                      ),
                      key: 'Publish-new-version',
                      onClick: () => onUpdate(true, true),
                    },
                  ],
                }}
              >
                <Button
                  hidden={
                    keyTab === 'translate' ||
                    keyTab === 'version'
                  }
                  type="primary"
                  loading={
                    updateBaseInfo.isLoading ||
                    updateBuilder.isLoading ||
                    updateSetting.isLoading
                  }
                >
                  <IntlMessage id="consentManagement.collectionPoint.detail.save" />
                </Button>
              </Dropdown>
            </PermissionWrapper>
          </>
        }
      />
      <CollectionPointDescription
        data={data as ConsentCollectionPointDetail}
        loading={isLoading}
      />
      <Card>
        <Tabs
          defaultActiveKey={keyTab}
          onChange={(tabKey) => setKeyTab(tabKey)}
          items={[
            {
              label: (
                <IntlMessage id="consentManagement.collectionPoint.detail.basicInfo" />
              ),
              key: 'basic-info',
              children: (
                <CollectionPointBasicInfo
                  form={form}
                  loading={isLoading}
                />
              ),
            },
            {
              label: (
                <IntlMessage id="consentManagement.collectionPoint.detail.builder" />
              ),
              key: 'builder',
              children: (
                <CollectionPointBuilder
                  collectionPointsId={collectionPointId}
                />
              ),
            },
            {
              label: (
                <IntlMessage id="consentManagement.collectionPoint.detail.translate" />
              ),
              key: 'translate',
              children: (
                <CollectionPointTranslate
                  collectionPointId={collectionPointId}
                  defaultLanguage="th"
                />
              ),
            },
            {
              label: (
                <IntlMessage id="consentManagement.collectionPoint.detail.setting" />
              ),
              key: 'setting',
              children: (
                <CollectionPointSetting
                  collectionPointsId={collectionPointId}
                  form={form}
                />
              ),
            },
            {
              label: (
                <IntlMessage id="consentManagement.collectionPoint.detail.version" />
              ),
              key: 'version',
              children: (
                <CollectionPointVersion
                  collectionpointId={collectionPointId}
                />
              ),
            },
          ]}
        />
      </Card>
      <CollectionPointGetScript
        open={toggle.openGetScript}
        onCancel={() => toggle.getScript()}
        collectionPointId={collectionPointId}
      />
      <CollectionPointPreview
        open={toggle.openPreview}
        onClose={() => toggle.preview()}
        collectionPointId={collectionPointId}
      />
    </FallbackError>
  );
};

CollectionPointDetailPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default CollectionPointDetailPage;
