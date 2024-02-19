import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getQuery, removeQuery } from '@/utils';

export type UseTab = {
  initialTab: string;
};

export const useTab = ({ initialTab }: UseTab) => {
  const [currentTab, setCurrentTab] = useState<
    string | undefined
  >();

  const router = useRouter();

  const onChange = async (tab: string) => {
    setCurrentTab(tab);
    const path = removeQuery(router.asPath);
    await router.push(`${path}?tab=${tab}`);
  };

  useEffect(() => {
    try {
      const query = getQuery(router.asPath);
      if (!currentTab) {
        const tab = _.get(query, 'tab', initialTab);
        setCurrentTab(tab);
      }
    } catch (error) {
      console.log(error);
    }
  }, [initialTab, router, currentTab]);

  return {
    currentTab,
    onChange,
  };
};
