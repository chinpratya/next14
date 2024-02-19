export const formatDate = (date: number | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
};

const UNIT_LIST = ['', 'K', 'M', 'G'];
export const formatNumber = (number: number) => {
  const sign = Math.sign(number);
  let unit = 0;

  while (Math.abs(number) >= 1000) {
    unit = unit + 1;
    number = Math.floor(Math.abs(number) / 100) / 10;
  }
  return sign * Math.abs(number) + UNIT_LIST[unit];
};

export const formatNumberWithCommas = (
  value: number
): string => {
  const formattedValue = value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedValue;
};
