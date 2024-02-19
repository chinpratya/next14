import { ReactNode } from 'react';

import { AppLayout } from '@/layouts';

const CustomReportPage = () => {
  return (
    <div
      style={{
        margin: -24,
      }}
    >
      <iframe
        src="https://report.pdpa.rmutsv.ac.th/#/"
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

CustomReportPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default CustomReportPage;
