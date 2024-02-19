import { Cascader, Typography } from 'antd';
import {
  CascaderProps,
  DefaultOptionType,
} from 'antd/lib/cascader';
import _ from 'lodash';
import { useRouter } from 'next/router';
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import { usePagination } from '@/hooks';

import {
  listLogSearchHost,
  useListLogSearchIndice,
} from '../../../../../log-search';

type BackupDataCascaderProps = PropsWithChildren<
  CascaderProps<Option>
> & {
  placeholder?: string;
};

type Option = {
  label: string | ReactNode;
  value: string;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
};

export const BackupDataCascader = ({
  placeholder,
  ...rest
}: BackupDataCascaderProps) => {
  const router = useRouter();
  const currentModule =
    router.pathname.split('/')[3] === 'log-management'
      ? 'LM'
      : 'SIEM';

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([
    {
      label: <IntlMessage id="logManagement.all" />,
      value: 'all',
    },
  ]);

  const { page, onPaginationChange } = usePagination();
  const listIndice = useListLogSearchIndice({
    page,
    module: currentModule,
    response_type: 'lists',
  });

  const getHostname = async (
    selectedOptions: DefaultOptionType[]
  ) => {
    const targetOption =
      selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const indices = selectedOptions[0].value as string;
    const listHost = await listLogSearchHost({
      type: 'indices',
      value: indices.split('-').pop() as string,
      response_type: 'list',
      module: currentModule,
    });

    targetOption.loading = false;
    targetOption.children = listHost.data ?? [];

    setOptions([...options]);
  };

  useEffect(() => {
    if (listIndice.data) {
      const value = listIndice.data.data.map(
        ({ label, value }) => ({
          label,
          value,
          isLeaf: false,
        })
      );

      setOptions((prev) => {
        const optionList = prev.filter(
          (item) => item.value !== 'loading'
        );

        return _.uniqBy(
          [...optionList, ...value],
          (option) => option.value
        );
      });
    }
  }, [listIndice.data]);

  useEffect(() => {
    const element = document.getElementsByClassName(
      'ant-cascader-menu'
    )[0];

    const handleScroll = () => {
      if (!listIndice.data || listIndice.isLoading)
        return;

      const { scrollTop, clientHeight, scrollHeight } =
        element;

      const meta = listIndice.data.meta;
      if (meta) {
        const { total_page = 1 } = meta;
        if (page >= total_page) return;
      }

      if (scrollTop + clientHeight === scrollHeight) {
        setOptions((state) => [
          ...state,
          {
            value: 'loading',
            label: (
              <Typography.Link>
                <IntlMessage id="logManagement.logSearch.filter.loading" />
              </Typography.Link>
            ),
            disabled: true,
          },
        ]);
        onPaginationChange(page + 1);
      }
    };

    if (open && element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element)
        element.removeEventListener(
          'scroll',
          handleScroll
        );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listIndice.data, open]);

  return (
    <Cascader
      loadData={getHostname}
      loading={listIndice.isLoading}
      options={options}
      placeholder={placeholder}
      onDropdownVisibleChange={(value) => setOpen(value)}
      {...rest}
    />
  );
};
