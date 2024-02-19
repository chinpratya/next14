import { WebformBuilderItem } from '../../share';
import { searchFormItem } from '../utils/searchFormItem';

export const validateAssessmentValuesWithoutPromise = (
  formItems: WebformBuilderItem[],
  formItemsKey: string[]
): boolean => {
  const messages: string[] = [];
  formItemsKey.forEach((formId) => {
    const item = searchFormItem(formId, formItems);
    if (!item) return;
    if (
      item?.widget === 'question-group' ||
      item?.widget === 'statement'
    )
      return;
    if (!item?.value) {
      messages.push(item?.title ?? '');
    }
  });
  return messages.length <= 0;
};

export const validateAssessmentValues = (
  formItems: WebformBuilderItem[],
  formItemsKey: string[]
) =>
  new Promise<void>((resolve, reject) => {
    const messages: string[] = [];

    formItemsKey.forEach((formId) => {
      const item = searchFormItem(formId, formItems);
      if (!item) return;
      if (
        item?.widget === 'question-group' ||
        item?.widget === 'statement'
      )
        return;
      if (!item?.value) {
        messages.push(item?.title ?? '');
      }
    });

    if (messages.length > 0) {
      reject(messages);
    }

    resolve();
  });
