import { Typography } from 'antd';
import { ReactElement } from 'react';

import {
  NewsMainLayout,
  NewsSourceList,
} from '@/features/threat-intelligence';
import AppLayout from '@layouts/AppLayout';

const NewsSourcePage = () => {
  return (
    <>
      <Typography.Title
        level={4}
        className="font-weight-bold mb-3"
      >
        แหล่งข่าว
      </Typography.Title>
      <NewsSourceList />
    </>
  );
};

NewsSourcePage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout>
      <NewsMainLayout>{page}</NewsMainLayout>
    </AppLayout>
  );
};

export default NewsSourcePage;
