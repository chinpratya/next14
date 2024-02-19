import data from './mock-data.json';
import { NewsSourceItem } from './news-source-item';

export const NewsSourceList = () => {
  return (
    <>
      {data.map((item) => (
        <NewsSourceItem key={item.id} {...item} />
      ))}
    </>
  );
};
