import _ from 'lodash';

// remove empty child elements from array
// child key is required
export const removeEmptyChild = (
  data: Array<Record<string, unknown>>,
  childrenKey: string
): Array<Record<string, unknown>> => {
  return data?.map((item) => {
    const children = _.get(
      item,
      childrenKey,
      []
    ) as Array<Record<string, unknown>>;

    if (children.length === 0) {
      return {
        ...item,
        [childrenKey]: undefined,
      };
    }
    return {
      ...item,
      [childrenKey]: removeEmptyChild(
        children,
        childrenKey
      ),
    };
  });
};
