import {
  Button,
  Col,
  Dropdown,
  Form,
  Row,
  Tabs,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import {
  PolicyBasicInfo,
  PolicyBasicInfoDescription,
  PolicyBasicInfoPolicyAdmin,
  PolicyBuilder,
  PolicyDetail,
  PolicySetting,
  PolicyVersionList,
  useGetPolicy,
  PolicyTranslate,
  PolicyPreview,
  useGetPolicyTemplateCustomize,
  useUpdatePolicyAndTemplate,
  useUpdatePublicPolicyAndTemplate,
  PolicyGetScript,
} from '@/features/policy-management';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { usePolicyBuilderStore } from '@/stores/policy-builder';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const PolicyDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] =
    useState<string>('basic-info');

  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();

  const { policySections, resetPolicyBuilderState } =
    usePolicyBuilderStore();

  const policyId = router.query.policyId as string;

  const { data, isLoading, isError } =
    useGetPolicy(policyId);

  const policyTemplate = useGetPolicyTemplateCustomize({
    templateId: policyId,
  });

  const updatePolicyAndTemplate =
    useUpdatePolicyAndTemplate({
      policyId,
      wizardId: policyTemplate.data?.ObjectUUID ?? '',
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'policyManagement.notification.policy.update'
          ) as string,
        });
      },
    });

  const updatePublicPolicyAndTemplate =
    useUpdatePublicPolicyAndTemplate({
      policyId,
      wizardId: policyTemplate?.data?.form_sections
        ?.length
        ? policyTemplate.data?.ObjectUUID
        : undefined,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'policyManagement.notification.policy.publish'
          ) as string,
        });
      },
    });

  const handlePublishPolicy = async (
    isNewVersion: boolean
  ) => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      updatePublicPolicyAndTemplate.submit({
        isNewVersion,
        policyData: {
          ...data,
          ...values,
        },
        templateData: {
          form_setting:
            form.getFieldValue('form_setting') ?? {},
          form_fields: policyTemplate.data?.form_fields,
          form_sections: policySections,
        },
      });
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  const handlerUpdatePolicy = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      updatePolicyAndTemplate.submit({
        policyData: {
          ...data,
          ...values,
        },
        templateData: {
          form_setting:
            form.getFieldValue('form_setting') ?? {},
          form_fields: policyTemplate.data?.form_fields,
          form_sections: policySections,
        },
      });
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        settings: {
          policy_review_schedule_unit: 'day',
          reminder_before_due_date_unit: 'day',
          ...data?.settings,
          publish_at: data?.settings?.publish_at
            ? moment(data?.settings?.publish_at)
            : null,
        },
      });
    }
  }, [data, form]);

  useEffect(() => {
    return () => {
      resetPolicyBuilderState();
    };
  }, [resetPolicyBuilderState]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="policyManagement.policy.detail.title" />
        }
        subtitle={data?.name}
        extra={
          <>
            <Button onClick={() => toggle.getScript()}>
              <IntlMessage id={tokens.common.getScript} />
            </Button>
            <Button onClick={() => toggle.preview()}>
              <IntlMessage id="policyManagement.policy.preview" />
            </Button>
            <PermissionWrapper
              moduleName={'policy'}
              policies={[
                permissions[
                  'pdpakit:policy:document:update'
                ],
              ]}
            >
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <IntlMessage id="policyManagement.policy.detail.save.draft" />
                      ),
                      key: 'draft',
                      onClick: () =>
                        handlerUpdatePolicy(),
                    },
                    {
                      label: (
                        <IntlMessage id="policyManagement.policy.detail.save.release" />
                      ),
                      key: 'release',
                      onClick: () =>
                        handlePublishPolicy(false),
                      disabled: data?.version === '0',
                    },
                    {
                      label: (
                        <IntlMessage id="policyManagement.policy.detail.save.publish" />
                      ),
                      key: 'publish',
                      onClick: () =>
                        handlePublishPolicy(true),
                    },
                  ],
                }}
              >
                <Button
                  hidden={[
                    'translate',
                    'version',
                  ].includes(activeTab)}
                  type="primary"
                  loading={
                    updatePolicyAndTemplate.isLoading ||
                    updatePublicPolicyAndTemplate.isLoading
                  }
                >
                  <IntlMessage id="policyManagement.policy.detail.save" />
                </Button>
              </Dropdown>
            </PermissionWrapper>
          </>
        }
        overlap
      />
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={[
          {
            label: (
              <IntlMessage id="policyManagement.policy.detail.title" />
            ),
            key: 'basic-info',
            forceRender: true,
            children: (
              <>
                <PolicyBasicInfoDescription
                  data={data as PolicyDetail}
                />
                <Row gutter={[24, 0]}>
                  <Col
                    {...getColLayout([
                      24, 24, 24, 12, 12, 12,
                    ])}
                  >
                    <PolicyBasicInfo form={form} />
                  </Col>
                  <Col
                    {...getColLayout([
                      24, 24, 24, 12, 12, 12,
                    ])}
                  >
                    <PolicyBasicInfoPolicyAdmin
                      policyId={policyId}
                    />
                  </Col>
                </Row>
              </>
            ),
          },
          {
            label: (
              <IntlMessage id="policyManagement.policy.detail.builder.title" />
            ),
            key: 'builder',
            forceRender: true,
            children: (
              <PolicyBuilder
                policyId={policyId}
                templateId={data?.policy_type ?? ''}
                form={form}
              />
            ),
          },
          {
            label: (
              <IntlMessage id="policyManagement.policy.detail.translate.title" />
            ),
            key: 'translate',
            children: (
              <PolicyTranslate policyId={policyId} />
            ),
          },
          {
            label: (
              <IntlMessage id="policyManagement.policy.detail.setting.title" />
            ),
            key: 'setting',
            forceRender: true,
            children: <PolicySetting form={form} />,
          },
          {
            label: (
              <IntlMessage id="policyManagement.policy.detail.version.title" />
            ),
            key: 'version',
            children: (
              <PolicyVersionList policyId={policyId} />
            ),
          },
        ]}
      />
      <PolicyPreview
        open={toggle.openPreview}
        onClose={() => toggle.preview()}
        policyId={policyId}
      />
      <PolicyGetScript
        open={toggle.openGetScript}
        onCancel={() => toggle.getScript()}
        policyId={policyId}
      />
    </FallbackError>
  );
};

PolicyDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default PolicyDetailPage;
