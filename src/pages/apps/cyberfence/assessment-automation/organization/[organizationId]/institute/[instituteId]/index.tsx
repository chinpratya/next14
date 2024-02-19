import { ContainerOutlined } from '@ant-design/icons';
import { useToggle } from '@mantine/hooks';
import {
  Button,
  Card,
  Form,
  FormInstance,
  Tabs,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/components/share-components/loading';
import { PageHeader } from '@/components/share-components/page-header';
import { TitleHeader } from '@/components/share-components/title-header';
import { FallbackError } from '@/components/util-components/fallback-error';
import {
  OrganizationBasicInfoUnitGeneralData,
  OrganizationBasicInfoUnitListRespondentsList,
  OrganizationUnit,
  useGetOrganization,
  useGetOrganizationUnit,
  useUpdateOrganizationUnit,
  OrganizationBasicInfoUnitAssessmentApproverList,
  OrganizationImportResponseApprove,
} from '@/features/compliance';
import { useNotifications } from '@/stores/notifications';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const getTabs = (
  form: FormInstance,
  data: OrganizationUnit,
  orgName: string,
  onImport: () => void
) => {
  return [
    {
      label: (
        <IntlMessage id="compliance.organization.detail.branch.basicInfo" />
      ),
      key: 'basicInfo',
      children: (
        <OrganizationBasicInfoUnitGeneralData
          form={form}
          data={data}
          orgName={orgName}
        />
      ),
    },
    {
      label: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents" />
      ),
      key: 'listRespondents',
      children: (
        <OrganizationBasicInfoUnitListRespondentsList
          onImport={onImport}
        />
      ),
    },
    {
      label: (
        <IntlMessage id="compliance.organization.detail.branch.assessmentApprover" />
      ),
      key: 'assessmentApprover',
      children: (
        <OrganizationBasicInfoUnitAssessmentApproverList />
      ),
    },
  ];
};

const InstitutePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const [openImport, toggleImport] = useToggle();

  const organizationId = router.query
    .organizationId as string;
  const instituteId = router.query.instituteId as string;

  const organization = useGetOrganization(organizationId);
  const { data, isLoading, isError } =
    useGetOrganizationUnit(organizationId, instituteId);

  const updateOrganizationUnit =
    useUpdateOrganizationUnit({
      organizationId: organizationId,
      instituteId: instituteId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'compliance.notification.organization.branch.update'
          ) as string,
        });
      },
    });

  const onUpdateOrganizationUnit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    updateOrganizationUnit.submit({
      organizationId: organizationId,
      instituteId: instituteId,
      data: values,
    });
  };

  if (isLoading || organization.isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <TitleHeader
            title={
              <IntlMessage id="compliance.organization.detail.title" />
            }
            icon={<ContainerOutlined />}
            meta={{
              organizationId: organization.data?.name,
              instituteId: data?.name,
            }}
            tabKeys={['basicInfo', 'institute']}
            dictionary={{
              organization: (
                <IntlMessage id="compliance.organization.title" />
              ),
              institute: (
                <IntlMessage id="compliance.organization.detail.branch.title" />
              ),
            }}
          />
        }
        extra={
          <Button
            type="primary"
            loading={updateOrganizationUnit.isLoading}
            onClick={onUpdateOrganizationUnit}
          >
            บันทึก
          </Button>
        }
      />
      <Card>
        <Tabs
          items={getTabs(
            form,
            data as OrganizationUnit,
            organization.data?.name as string,
            toggleImport
          )}
        />
      </Card>
      <OrganizationImportResponseApprove
        organizationId={organizationId}
        instituteId={instituteId}
        open={openImport}
        onToggle={toggleImport}
      />
    </FallbackError>
  );
};

InstitutePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default InstitutePage;
