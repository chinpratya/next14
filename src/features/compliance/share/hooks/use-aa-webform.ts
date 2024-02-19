import { DropResult } from '@hello-pangea/dnd';
import { FormInstance } from 'antd';

import { WebformBuilderItem } from '../types/webform-builder';

export type UseAaWebform = {
  webformBuilderItems?: WebformBuilderItem[];
};

export const useAaWebform = ({
  webformBuilderItems = [],
}: UseAaWebform = {}) => {
  const getAllWebformBuilderItemsWithChildren = (
    webformBuilderItems: WebformBuilderItem[]
  ) => {
    const items: WebformBuilderItem[] = [];
    webformBuilderItems.forEach((item) => {
      items.push(item);
      if (item.children) {
        items.push(
          ...getAllWebformBuilderItemsWithChildren(
            item.children
          )
        );
      }
    });
    return items;
  };

  const findWebformBuilderItemParent = (
    childrenId: string
  ) => {
    const items = getAllWebformBuilderItemsWithChildren(
      webformBuilderItems
    );
    return items.find((item) =>
      item.children?.find(
        (child) => child.key === childrenId
      )
    );
  };

  const getWebformBuilderItem = (key: string) => {
    const items = getAllWebformBuilderItemsWithChildren(
      webformBuilderItems
    );
    return items.find((item) => item.key === key);
  };

  const onDragEnd = (
    result: DropResult,
    form: FormInstance
  ) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const options = form.getFieldValue('options');
    const [removed] = options.splice(source.index, 1);
    options.splice(destination.index, 0, removed);
    form.setFieldsValue({ options });
  };

  return {
    getAllWebformBuilderItemsWithChildren,
    findWebformBuilderItemParent,
    getWebformBuilderItem,
    onDragEnd,
  };
};
