import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AppLayout } from '@/layouts';
import { riskAssessmentNavigation } from '@/navigations/risk-assessment';
import { Loading } from '@components/loading';

const AssessmentAutomationPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const redirectPage = async () => {
      const [firstPage] =
        await riskAssessmentNavigation();
      if (firstPage) {
        if (firstPage.children) {
          replace(firstPage.children[0].key, undefined, {
            shallow: true,
          });
          return;
        }

        replace(firstPage.key, undefined, {
          shallow: true,
        });
      } else {
        replace(
          '/apps/datafence/risk-assessment/template-risk',
          undefined,
          {
            shallow: true,
          }
        );
      }
    };

    redirectPage();
  }, [replace]);

  return <Loading cover="page" />;
};

AssessmentAutomationPage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default AssessmentAutomationPage;
