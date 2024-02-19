import { ReactElement } from 'react';

import {
  NewsInfo,
  NewsMainLayout,
} from '@/features/threat-intelligence';
import AppLayout from '@layouts/AppLayout';

const NewsDetailPage = () => {
  return <NewsInfo />;
};

NewsDetailPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout>
      <NewsMainLayout>{page}</NewsMainLayout>
    </AppLayout>
  );
};

export default NewsDetailPage;
