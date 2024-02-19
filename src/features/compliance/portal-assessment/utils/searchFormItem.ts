import { WebformBuilderItem } from '../../share';

export const searchFormItem = (
  formId: string,
  formItems: WebformBuilderItem[]
): WebformBuilderItem | undefined => {
  let foundItem: WebformBuilderItem | undefined;
  formItems.forEach((item) => {
    const found = searchFormItem(
      formId,
      item?.children ?? []
    );
    if (item.key === formId) {
      foundItem = item;
    }
    if (found) {
      foundItem = found;
    }
  });
  return foundItem;
};
