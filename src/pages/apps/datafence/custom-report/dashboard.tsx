import { ReactNode } from 'react';

import { AppLayout } from '@/layouts';

const CustomReportDashboardPage = () => {
  return (
    <div
      style={{
        margin: -24,
      }}
    >
      <iframe
        src="https://mongochart.pdpa.rmutsv.ac.th"
        style={{
          width: '100%',
          height: 'calc(100vh - 64px - 70px - 4px)',
          border: 'none',
        }}
        allowFullScreen
      />
    </div>
  );
};

CustomReportDashboardPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default CustomReportDashboardPage;
