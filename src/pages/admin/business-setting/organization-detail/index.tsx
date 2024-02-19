import { useToggle } from '@mantine/hooks';
import { Button, Card, Form, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import {
  DetailsOrganization,
  OtherInformation,
  useGetOrganizationInfo,
  useUpdateOrganizationInfo,
  ListLvOrganization,
  OrganizationLevel,
} from '@/features/admin';
import { useTab } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { removeQuery } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const OrganizationDetailPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<
    'information' | 'lv-organization'
  >('information');
  const [editable, toggleEditable] = useToggle();
  const [form] = Form.useForm();
  const router = useRouter();

  const { showNotification } = useNotifications();

  const tab = useTab({
    initialTab: 'information',
  });

  const { data, isError, isLoading } =
    useGetOrganizationInfo();

  const updateOrganization = useUpdateOrganizationInfo({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.organization.update'
        ) as string,
      });
      toggleEditable();
    },
  });

  const handleTabChange = (key: string) => {
    setActiveTab(
      key as 'information' | 'lv-organization'
    );
  };

  if (isLoading) return <Loading cover="content" />;

  const onEditLvOrganization = (
    level: OrganizationLevel
  ) => {
    router.push(
      `${removeQuery(router.asPath)}/lv/${level.levelId}`
    );
  };

  const onUpdateOrganization = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateOrganization.submit(values);
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="admin.businessSetting.organizationDetail" />
        }
        overlap
        extra={
          <Button
            type="primary"
            onClick={() =>
              handleTabChange('lv-organization')
            }
            hidden={activeTab === 'lv-organization'}
          >
            <IntlMessage id="admin.businessSetting.organizationDetail.next" />
          </Button>
        }
      />
      <Tabs
        activeKey={tab.currentTab}
        onChange={tab.onChange}
        items={[
          {
            key: 'information',
            label: (
              <IntlMessage id="admin.businessSetting.organizationDetail.basicInfo" />
            ),
            children: (
              <>
                <OtherInformation
                  createdBy={data?.created_by}
                  createdDate={data?.created_dt}
                  lastUpdatedBy={data?.updated_by}
                  lastUpdatedDate={data?.updated_dt}
                />
                <Card
                  extra={
                    editable ? (
                      <>
                        <Button
                          onClick={() => toggleEditable()}
                          className="mr-2"
                        >
                          <IntlMessage id="admin.businessSetting.organizationDetail.cancel" />
                        </Button>
                        <Button
                          type="primary"
                          onClick={onUpdateOrganization}
                          loading={
                            updateOrganization.isLoading
                          }
                        >
                          <IntlMessage id="admin.businessSetting.organizationDetail.save" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => toggleEditable()}
                      >
                        <IntlMessage id="admin.businessSetting.organizationDetail.edit" />
                      </Button>
                    )
                  }
                >
                  <DetailsOrganization
                    data={data}
                    disabled={!editable}
                    form={form}
                    mode="edit"
                  />
                </Card>
              </>
            ),
          },
          {
            key: 'lv-organization',
            label: (
              <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization" />
            ),
            children: (
              <ListLvOrganization
                onEdit={onEditLvOrganization}
              />
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

OrganizationDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default OrganizationDetailPage;
