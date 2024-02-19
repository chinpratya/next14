import { useState, useEffect } from 'react';

import { WebformBuilderItem } from '../types/webform-builder';

export type UseAaWebformLogicProps = {
  webformBuilderItems?: WebformBuilderItem[];
};

const AVAILABLE_LOGIC_WIDGET = ['check-box', 'radio-box'];

export const useAaWebformLogic = ({
  webformBuilderItems,
}: UseAaWebformLogicProps = {}) => {
  const [logicWebformItems, setLogicWebformItems] =
    useState<WebformBuilderItem[]>([]);

  useEffect(() => {
    const items: WebformBuilderItem[] = [];
    webformBuilderItems?.forEach((item) => {
      const children: WebformBuilderItem[] = [];
      if (item?.children) {
        item.children.forEach((child) => {
          if (
            AVAILABLE_LOGIC_WIDGET.includes(child.widget)
          ) {
            children.push(child);
          }
        });
      }
      if (
        [
          ...AVAILABLE_LOGIC_WIDGET,
          'question-group',
        ].includes(item.widget)
      ) {
        items.push({ ...item, children });
      }
    });
    setLogicWebformItems(items);
  }, [webformBuilderItems]);

  return {
    logicWebformItems,
  };
};
