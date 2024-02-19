export type TableHeaderProps = {
  title?: string;
  colSpan?: number;
  rowSpan?: number;
};

export const TableHeader = ({
  title,
  colSpan = 1,
  rowSpan = 1,
}: TableHeaderProps) => {
  return (
    <th colSpan={colSpan} rowSpan={rowSpan}>
      {title}
    </th>
  );
};
