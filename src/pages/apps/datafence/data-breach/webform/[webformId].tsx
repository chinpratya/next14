import { Flex } from '@mantine/core';
import {
  Button,
  Card,
  Dropdown,
  Form,
  Tabs,
  MenuProps,
  Typography,
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
  useUpdatePublicWebform,
  useGetWebformTemplate,
  RiskMatrixChance,
  RiskMatrixEffect,
  RiskMatrixScore,
  WebformEventTemplate,
  RiskMatrixSelect,
  useUpdateWebform,
} from '@/features/data-breach';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import { useNotifications } from '@/stores/notifications';
import { ConsentFormType } from '@/types';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';
import { permissions } from '@/permissions';
import { PermissionWrapper } from '@/features/shared';
import { usePermission } from '@/hooks';

const WebFormDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const webformId = router.query.webformId as string;

  const webformTemplate =
    useGetWebformTemplate(webformId);

  const { formItems, formConditions, formSetting } =
    useConsentBuilderStore();

  const [activeTab, setActiveTab] =
    useState<string>('basic-info');

  const { data, isError, isLoading } =
    useGetWebform(webformId);

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:webform:update'],
    ],
  });

  const updateWebform = useUpdateWebform({
    webformId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.webform.notifications.update
        ) as string,
      });
    },
  });

  const updatePublicWebform = useUpdatePublicWebform({
    webformId,
    onSuccess: (isPublic) => {
      if (isPublic) {
        showNotification({
          type: 'success',
          message: t(
            tokens.dataBreach.webform.notifications
              .publish
          ) as string,
        });
        return;
      }

      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.webform.notifications.update
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

  const handlerChangeRiskAssessment = (
    riskassessment: string
  ) =>
    updateWebform.submit({
      ...data,
      riskassessment,
    });

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
        <IntlMessage
          id={tokens.dataBreach.webform.saveDraft}
        />
      ),
      onClick: () =>
        handlerUpdatePublicWebform(false, false),
      key: 'draft',
    },
    {
      label: (
        <IntlMessage
          id={tokens.dataBreach.webform.saveRelease}
        />
      ),
      onClick: () =>
        handlerUpdatePublicWebform(true, false),
      key: 'release',
    },
    {
      label: (
        <IntlMessage
          id={tokens.dataBreach.webform.savePublish}
        />
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
          <IntlMessage
            id={tokens.dataBreach.webform.detail}
          />
        }
        subtitle={data?.name}
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:webform:update'
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
                <IntlMessage id={tokens.common.save} />
              </Button>
            </Dropdown>
          </PermissionWrapper>
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
                <IntlMessage
                  id={tokens.dataBreach.webform.basicInfo}
                />
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
                <IntlMessage
                  id={tokens.dataBreach.webform.builder}
                />
              ),
              key: 'webform',
              forceRender: true,
              children: (
                <WebformBuilder webformId={webformId} />
              ),
            },
            {
              label: (
                <IntlMessage
                  id={
                    tokens.dataBreach.webform.riskMatrix
                  }
                />
              ),
              key: 'riskMatrix',
              disabled: !data?.riskassessment,
              children: (
                <>
                  <Flex
                    className="mt-2 mb-3"
                    justify="space-between"
                    align="center"
                  >
                    <Typography.Title
                      style={{
                        fontWeight: 700,
                      }}
                      level={4}
                    >
                      <IntlMessage
                        id={
                          tokens.dataBreach.webform
                            .riskMatrix
                        }
                      />
                    </Typography.Title>
                    <Flex align="center" gap={8}>
                      <Typography.Text>
                        <IntlMessage
                          id={
                            tokens.dataBreach.webform
                              .selectRiskMatrix
                          }
                        />{' '}
                        :
                      </Typography.Text>
                      <RiskMatrixSelect
                        defaultValue={
                          data?.riskassessment
                        }
                        style={{ minWidth: 180 }}
                        onChange={
                          handlerChangeRiskAssessment
                        }
                      />
                    </Flex>
                  </Flex>
                  <RiskMatrixChance
                    riskMatrixId={
                      data?.riskassessment ?? ''
                    }
                    isReadOnly
                  />
                  <RiskMatrixEffect
                    riskMatrixId={
                      data?.riskassessment ?? ''
                    }
                    isReadOnly
                  />
                  <RiskMatrixScore
                    riskMatrixId={
                      data?.riskassessment ?? ''
                    }
                    isReadOnly
                    isAllow={editPermission.isAllow}
                  />
                </>
              ),
            },
            {
              label: (
                <IntlMessage
                  id={
                    tokens.dataBreach.webform
                      .incidentTemplate
                  }
                />
              ),
              key: 'incidentTemplate',
              forceRender: true,
              children: <WebformEventTemplate />,
            },
            {
              label: (
                <IntlMessage
                  id={tokens.dataBreach.webform.setting}
                />
              ),
              key: 'setting',
              children: <WebformSetting form={form} />,
              forceRender: true,
            },
            {
              label: (
                <IntlMessage
                  id={tokens.dataBreach.webform.version}
                />
              ),
              key: 'version',
              children: (
                <WebformVersion webformId={webformId} />
              ),
            },
          ]}
        />
      </Card>
    </FallbackError>
  );
};

WebFormDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default WebFormDetailPage;
