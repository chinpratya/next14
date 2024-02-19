import { Select } from 'antd';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { useListCountry } from '../../../features/shared';
import { Country } from '../../../features/shared/types/meta';

export type SelectCountryProps = {
  value?: string;
  onChange?: (ObjectUUID: string) => void;
};

export const SelectCountry = ({
  value,
  onChange,
}: SelectCountryProps) => {
  const country = useListCountry();

  const data = country?.data?.data.find(
    (item) => item.name_th === value
  );
  const [countryOptions, setCountryOptions] = useState<
    Country[]
  >([]);

  const [searchText, setSearchText] =
    useState<string>('');

  useEffect(() => {
    if (country?.data?.data && searchText === '') {
      setCountryOptions(country?.data.data);
    }
  }, [country, searchText]);

  const onSearch = (text: string) => {
    const newOptions: Country[] = country?.data?.data
      ? country?.data?.data.filter((v) =>
          v.name_th
            .toLocaleLowerCase()
            .toLowerCase()
            .includes(text)
        )
      : [];
    setSearchText(text);
    setCountryOptions([...newOptions]);
  };

  return (
    <>
      <Select
        value={data?.ObjectUUID || value}
        loading={country.isLoading}
        onChange={onChange}
        className="w-100"
        showSearch
        onSearch={(e) => onSearch(e)}
        filterOption={() => true}
        defaultValue={data?.ObjectUUID}
        options={countryOptions.map((v) => {
          return {
            label: (
              <>
                <Image
                  src={`/img/country/${v.alpha2.toLocaleLowerCase()}.svg`}
                  width={20}
                  height={20}
                  alt="countryImg"
                  className="mr-2"
                />
                &nbsp;
                {v.name_th}
              </>
            ),
            value: v.ObjectUUID,
          };
        })}
      />
    </>
  );
};
