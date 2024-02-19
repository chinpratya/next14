import { Badge, Tooltip, Typography } from 'antd';

export type TagTooltipListChildProps = { list: string[] };

export const TagTooltipListChild = ({
  list,
}: TagTooltipListChildProps) => {
  if (list.length === 0) return null;
  return (
    <>
      <Typography.Text className="mr-2">
        {list[0]}
      </Typography.Text>
      {list.length > 1 && (
        <Tooltip title={list?.slice(1).join('/')}>
          <Badge
            count={`+${list.length - 1}`}
            style={{
              backgroundColor: '#fff',
              color: '#999',
              boxShadow: '0 0 0 1px #d9d9d9 inset',
            }}
          />
        </Tooltip>
      )}
    </>
  );
};
