import { Flex } from '@mantine/core';
import { Card, Divider } from 'antd';
import { Fragment } from 'react';

import { DashboardPopularNewsItem } from './dashboard-popular-news-item';
import data from './mock-data.json';

export const DashboardPopularNews = () => {
  return (
    <Card title="Most Popular News" className="h-100">
      <Flex direction="column">
        {data.map((item, index) => (
          <Fragment key={item.id}>
            <DashboardPopularNewsItem {...item} />
            {index !== data.length - 1 && (
              <Divider className="m-0" />
            )}
          </Fragment>
        ))}
      </Flex>
    </Card>
  );
};
