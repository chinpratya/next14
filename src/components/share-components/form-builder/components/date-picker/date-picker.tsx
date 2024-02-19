import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';

const AntdDatePicker = dynamic(
  () =>
    import('@/components/share-components/date-picker'),
  { ssr: false }
);

export type DatePickerProps = PickerProps<Dayjs> & {
  isDisabledFutureDate?: boolean;
  isDisabledPastDate?: boolean;
  readOnly?: boolean;
};
export const DatePicker = ({
  isDisabledFutureDate,
  isDisabledPastDate,
  readOnly,
  onChange,
  ...dataPickerProps
}: DatePickerProps) => {
  return (
    <AntdDatePicker
      className="w-100"
      disabledDate={(current) => {
        if (isDisabledFutureDate) {
          return current && current > dayjs();
        }
        if (isDisabledPastDate) {
          return current && current < dayjs();
        }
        return false;
      }}
      format="DD/MM/YYYY"
      {...dataPickerProps}
      value={dayjs(dataPickerProps.value)}
      onChange={readOnly ? undefined : onChange}
    />
  );
};
