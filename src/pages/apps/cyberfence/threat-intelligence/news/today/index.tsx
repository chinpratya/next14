import { Typography } from 'antd';
import { ReactElement } from 'react';

import {
  NewsMainLayout,
  NewsTodayList,
} from '@/features/threat-intelligence';
import AppLayout from '@layouts/AppLayout';

const NewsTodayPage = () => {
  return (
    <>
      <Typography.Title
        level={4}
        className="font-weight-bold mb-3"
      >
        Most Popular News
      </Typography.Title>
      <NewsTodayList />
    </>
  );
};

NewsTodayPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout>
      <NewsMainLayout>{page}</NewsMainLayout>
    </AppLayout>
  );
};

export default NewsTodayPage;
