import {
  Button,
  Card,
  Dropdown,
  Form,
  Tabs,
  MenuProps,
} from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  WebformBasicInfo,
  WebformBuilder,
  WebformSetting,
  WebformVersion,
  useGetWebform,
  WorkflowDescriptionInfo,
  WebFormDetail,
  WebForm,
  WebformPreviewModal,
  WebformGetScriptModal,
  useUpdatePublicWebform,
  useGetWebformTemplate,
} from '@/features/dsar-automation';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import { useNotifications } from '@/stores/notifications';
import { ConsentFormType } from '@/types';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const WebFormDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const toggle = useToggle<WebForm>();

  const webformId = router.query.webformId as string;

  const webformTemplate =
    useGetWebformTemplate(webformId);

  const { formItems, formConditions, formSetting } =
    useConsentBuilderStore();

  const [activeTab, setActiveTab] =
    useState<string>('basic-info');

  const { data, isError, isLoading } =
    useGetWebform(webformId);

  const updatePublicWebform = useUpdatePublicWebform({
    webformId,
    onSuccess: (isPublic) => {
      if (isPublic) {
        showNotification({
          type: 'success',
          message: t(
            'dsarAutomation.notification.webForm.publish'
          ) as string,
        });
        return;
      }

      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.webForm.update'
        ) as string,
      });
    },
  });

  const handlerUpdatePublicWebform = async (
    isPublic: boolean,
    isNewVersion?: boolean
  ) => {
    try {
      await form.validateFields();
      const values = await form.validateFields();

      const consentForm = {
        formItems: formItems ?? [],
        formConditions,
        formSetting,
      } as ConsentFormType;

      updatePublicWebform.submit({
        form: consentForm,
        formLanguage: webformTemplate?.data?.Language,
        isPublic,
        data: {
          ...data,
          ...values,
          isNewVersion,
        },
      });
    } catch (error) {
      showNotification({
        type: 'error',
        message: _.get(error, 'errorFields[0].errors[0]'),
      });
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.save.draft" />
      ),
      onClick: () =>
        handlerUpdatePublicWebform(false, false),
      key: 'draft',
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.save.release" />
      ),
      onClick: () =>
        handlerUpdatePublicWebform(true, false),
      key: 'release',
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.save.publish" />
      ),
      onClick: () =>
        handlerUpdatePublicWebform(true, true),
      key: 'publish',
    },
  ];

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="dsarAutomation.setting.webForm.detail.title" />
        }
        subtitle={data?.name}
        extra={
          <>
            <Button
              onClick={() => toggle.getScript(data)}
            >
              <IntlMessage id="dsarAutomation.setting.webForm.detail.getScript" />
            </Button>
            <Button onClick={() => toggle.preview(data)}>
              <IntlMessage id="dsarAutomation.setting.webForm.detail.preview" />
            </Button>
            <PermissionWrapper
              moduleName={'dsar'}
              policies={[
                permissions[
                  'pdpakit:dsar:webform:update'
                ],
              ]}
            >
              <Dropdown
                menu={{ items }}
                placement="bottomLeft"
                trigger={['click']}
              >
                <Button
                  hidden={
                    ![
                      'basic-info',
                      'webform',
                      'setting',
                    ].includes(activeTab)
                  }
                  type="primary"
                  loading={updatePublicWebform.isLoading}
                >
                  <IntlMessage id="dsarAutomation.setting.webForm.detail.save" />
                </Button>
              </Dropdown>
            </PermissionWrapper>
          </>
        }
      />
      <WorkflowDescriptionInfo
        data={data as WebFormDetail}
      />
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={[
            {
              label: (
                <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo" />
              ),
              key: 'basic-info',
              forceRender: true,
              children: (
                <WebformBasicInfo
                  form={form}
                  webformId={webformId}
                />
              ),
            },
            {
              label: (
                <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm" />
              ),
              key: 'webform',
              forceRender: true,
              children: (
                <WebformBuilder webformId={webformId} />
              ),
            },
            {
              label: (
                <IntlMessage id="dsarAutomation.setting.webForm.detail.setting" />
              ),
              key: 'setting',
              children: <WebformSetting form={form} />,
              forceRender: true,
            },
            {
              label: (
                <IntlMessage id="dsarAutomation.setting.webForm.detail.version" />
              ),
              key: 'version',
              children: (
                <WebformVersion webformId={webformId} />
              ),
            },
          ]}
        />
      </Card>
      <WebformGetScriptModal
        open={toggle.openGetScript}
        onClose={() => toggle.getScript()}
        webform={{
          ...toggle.data,
          webformID: webformId,
        }}
      />
      <WebformPreviewModal
        open={toggle.openPreview}
        onClose={() => toggle.preview()}
        webformId={webformId}
      />
    </FallbackError>
  );
};

WebFormDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default WebFormDetailPage;
