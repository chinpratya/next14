type Layout = number;
type CustomLayout = [
  number,
  number,
  number,
  number,
  number,
  number
];
export const getColLayout = (
  layout: Layout | CustomLayout
) => {
  if (typeof layout === 'number') {
    return {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: layout,
      xxl: layout,
    };
  }

  return {
    xs: layout[0],
    sm: layout[1],
    md: layout[2],
    lg: layout[3],
    xl: layout[4],
    xxl: layout[5],
  };
};
