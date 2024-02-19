import { Divider } from 'antd';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { NewsItem } from '../news-item';

import data from './mock-data.json';

export const NewsTodayList = () => {
  const router = useRouter();

  const onClick = (newsId: number) => {
    router.push(
      `/apps/cyberfence/threat-intelligence/news/${newsId}`
    );
  };

  return (
    <>
      {data.map((item, index) => (
        <Fragment key={item.id}>
          <NewsItem
            {...item}
            onClick={() => onClick(item.id)}
          />
          {index !== data.length - 1 && (
            <Divider className="m-0" />
          )}
        </Fragment>
      ))}
    </>
  );
};
