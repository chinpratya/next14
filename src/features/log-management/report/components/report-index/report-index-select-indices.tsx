import { Form, FormInstance, Select } from 'antd';
import uniqBy from 'lodash/uniqBy';
import { UIEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useListIndice } from '@/features/log-management';
import { usePagination } from '@/hooks';
import { Option } from '@/types';

type ReportIndexSelectIndicesProps = {
  form: FormInstance;
};

export const ReportIndexSelectIndices = ({
  form,
}: ReportIndexSelectIndicesProps) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<Option[]>([
    { label: t('logManagement.all'), value: '' },
  ]);

  const { page, onPaginationChange } = usePagination();

  const listIndice = useListIndice({
    page,
    module: 'LM',
    responseType: 'lists',
    pageSize: 20,
  });

  const onChangeIndice = () => {
    form.setFieldValue('hostname', ['']);
  };

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const { target } = event;
    const { scrollTop, offsetHeight, scrollHeight } =
      target as HTMLDivElement;

    if (
      !listIndice.data ||
      listIndice.isLoading ||
      !listIndice.data?.meta
    )
      return;

    const meta = listIndice.data.meta;
    if (meta) {
      const { total_page = 1 } = meta;
      if (page >= total_page) return;
    }

    if (scrollTop + offsetHeight === scrollHeight) {
      onPaginationChange(page + 1);
    }
  };

  useEffect(() => {
    if (listIndice.data) {
      const indicesList =
        (listIndice.data.data as Option[]) ?? [];

      setOptions(() => {
        const optionList = options.filter(
          (item) => item.value !== 'loading'
        );

        return uniqBy(
          [...optionList, ...indicesList],
          (item) => item.value
        );
      });
    }
  }, [listIndice.data]);

  return (
    <Form.Item
      label={
        <IntlMessage id="logManagement.indices.title" />
      }
      name="indices"
      initialValue=""
    >
      <Select
        options={options}
        onPopupScroll={onScroll}
        onChange={onChangeIndice}
      />
    </Form.Item>
  );
};
