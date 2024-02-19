import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const AntdRangPicker = DatePicker.RangePicker;

export type UseRangePicker = {
  format?: string;
  disabledFuture?: boolean;
};

export const useRangePicker = ({
  format = 'DD/MM/YYYY',
  disabledFuture = false,
}: UseRangePicker = {}) => {
  const [startDate, setStartDate] = useState<
    string | null
  >(null);
  const [endDate, setEndDate] = useState<string | null>(
    null
  );

  const RangePicker = ({
    ...props
  }: {
    className?: string;
  }) => {
    return (
      <AntdRangPicker
        {...props}
        format={format}
        value={[
          startDate ? moment(startDate, format) : null,
          endDate ? moment(endDate, format) : null,
        ]}
        disabledDate={(current: any) => {
          if (disabledFuture) {
            return (
              current && current > moment().endOf('day')
            );
          }
          return false;
        }}
        onChange={(dates) => {
          if (dates) {
            setStartDate(
              dates[0]?.format(format) ?? null
            );
            setEndDate(dates[1]?.format(format) ?? null);
          } else {
            setStartDate(null);
            setEndDate(null);
          }
        }}
      />
    );
  };

  return {
    startDate,
    endDate,
    RangePicker,
  };
};
