import { ReactElement } from 'react';

import { PageHeader } from '@/components/share-components/page-header';
import { FeedList } from '@/features/threat-intelligence';
import AppLayout from '@layouts/AppLayout';

const FeedPage = () => {
  return (
    <>
      <PageHeader title="Analysis" />
      <FeedList />
    </>
  );
};

FeedPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <AppLayout>{page}</AppLayout>;
};

export default FeedPage;
