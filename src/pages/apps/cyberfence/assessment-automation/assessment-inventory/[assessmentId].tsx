import { Form, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import {
  AssessmentInventoryInfoDetail,
  useAssessmentAutomationStore,
  useGetAssessmentInventory,
  useGetAssessmentInventoryForm,
  WebformCustomizing,
} from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { useTheme } from '@/stores/theme';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { TabsInside } from '@components/tabs-inside';
import { FallbackError } from '@utilComponents/fallback-error';

const AssessmentInventoryDetailPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const { setFormItems } = useAssessmentAutomationStore();
  const { navCollapsed, toggleCollapsedNav } = useTheme();

  const assessmentId = router.query
    .assessmentId as string;

  const [activeKeyTab, setActiveKeyTab] =
    useState('info');

  const { data, isLoading, isError } =
    useGetAssessmentInventory({
      assessmentId,
    });

  const { data: formData, ...assessmentInventoryForm } =
    useGetAssessmentInventoryForm({
      assessmentId,
      enabled: activeKeyTab === 'webform',
    });

  const onChange = (key: string) => {
    setActiveKeyTab(key);
  };

  useEffect(() => {
    if (
      ['webform', 'score', 'logic'].includes(
        activeKeyTab
      ) &&
      !navCollapsed
    ) {
      toggleCollapsedNav(true);
    }
    if (activeKeyTab === 'info' && navCollapsed) {
      toggleCollapsedNav(false);
    }
  }, [activeKeyTab, navCollapsed, toggleCollapsedNav]);

  useEffect(() => {
    if (formData) {
      setFormItems(formData?.data?.form ?? []);
    }
  }, [formData, setFormItems]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title="รายละเอียดแบบฟอร์ม"
        subtitle={data?.data?.name}
        onBack={() =>
          router.replace(
            '/apps/cyberfence/assessment-automation/assessment-inventory'
          )
        }
      />
      <TabsInside
        activeKey={activeKeyTab}
        onChange={onChange}
        items={[
          {
            key: 'info',
            label: 'ข้อมูลพื้นฐาน',
            children: (
              <div className="p-4">
                <AssessmentInventoryInfoDetail
                  form={form}
                  data={data?.data ?? null}
                  isLoading={isLoading}
                />
              </div>
            ),
          },
          {
            key: 'webform',
            label: 'แบบฟอร์ม',
            children: (
              <FallbackError
                isError={assessmentInventoryForm.isError}
                style={{ margin: 24 }}
              >
                <div className="pl-4 pr-4 pt-0 pb-0">
                  {assessmentInventoryForm.isLoading ? (
                    <Skeleton className="p-4" active />
                  ) : (
                    <WebformCustomizing />
                  )}
                </div>
              </FallbackError>
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

AssessmentInventoryDetailPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default AssessmentInventoryDetailPage;
