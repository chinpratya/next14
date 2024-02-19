import { Typography } from 'antd';

export type WidgetHeaderProps = {
  title: string;
  description?: string;
  quotationMarks?: boolean;
};
export const WidgetHeader = ({
  title,
  description,
  quotationMarks,
}: WidgetHeaderProps) => {
  return (
    <>
      <Typography.Title level={3}>
        {quotationMarks ? `"${title}"` : title}
      </Typography.Title>
      <Typography.Paragraph
        type="secondary"
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {description}
      </Typography.Paragraph>
    </>
  );
};
