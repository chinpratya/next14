import { Card, CardProps } from 'antd';

export type BoardWrapperProps = CardProps;

export const BoardWrapper = (
  props: BoardWrapperProps
) => {
  return (
    <Card
      style={{
        width: 525,
        minWidth: 525,
        color: '#f0f0f0',
        minHeight: props.loading ? 200 : 750,
      }}
      {...props}
    />
  );
};
