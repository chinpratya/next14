import { Divider, Select } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { AddSelect } from '@components/add-select';
import { Loading } from '@components/loading';
import { FallbackError } from '@utilComponents/fallback-error';

import { useCreateSelectOptionTypeData } from '../../api/create-select-option-type-data';
import { useListSelectOptionTypeData } from '../../api/list-select-option-type-data';
import { OptionTypeData } from '../../types/option-type-data';

const convertDataToOptions = (
  options: OptionTypeData[]
) =>
  options.map((option) => ({
    label: option.name,
    value: option.ObjectUUID,
  }));

export type SelectOptionTypeDataProps = {
  value?: string;
  onChange?: (value: string) => void;
  type: string;
};

export const SelectOptionTypeData = ({
  value,
  onChange,
  type,
}: SelectOptionTypeDataProps) => {
  const { data, isLoading, isError } =
    useListSelectOptionTypeData({
      type,
    });

  const createSelectOptionTypeData =
    useCreateSelectOptionTypeData({
      type,
    });

  const onAdd = (name: string) =>
    createSelectOptionTypeData.submit({
      name,
    });

  return (
    <Select
      value={value}
      onChange={onChange}
      dropdownRender={(menu) =>
        isLoading ? (
          <Loading />
        ) : (
          <FallbackError isError={isError} borderLess>
            <Scrollbars style={{ height: 250 }} autoHide>
              {menu}
            </Scrollbars>
            <Divider style={{ margin: '8px 0' }} />
            <AddSelect
              onAdd={onAdd}
              loading={
                createSelectOptionTypeData.isLoading
              }
              addText="เพิ่มวิธีการเข้าถึงข้อมูล"
              errorMessage="กรุณากรอกวิธีการเข้าถึงข้อมูล"
            />
          </FallbackError>
        )
      }
      options={convertDataToOptions(data?.data || [])}
    />
  );
};
