import { css } from '@emotion/css';
import {
  Cascader,
  Form,
  FormInstance,
  Typography,
} from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';
import uniqBy from 'lodash/uniqBy';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import {
  useListIndice,
  useLogSearchStore,
} from '@/features/log-management';
import { usePagination } from '@/hooks';

import { listLogSearchHost } from '../../api/list-host';

type Option = {
  label: string | ReactNode;
  value: string;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
};

type LogSearchFilterIndiceProps = {
  form: FormInstance;
};

export const LogSearchFilterIndice = ({
  form,
}: LogSearchFilterIndiceProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const logSearchStore = useLogSearchStore();

  const { page, onPaginationChange } = usePagination();

  const currentModule =
    router.pathname.split('/')[3] === 'log-management'
      ? 'LM'
      : 'SIEM';
  const listIndice = useListIndice({
    page,
    pageSize: 20,
    module: currentModule,
    responseType: 'lists',
    alias_name: true,
  });

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

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

    if (listHost.data.length < 1) {
      logSearchStore.onSetData({
        ...logSearchStore.data,
        indices,
        hostname: [],
      });
    }

    targetOption.loading = false;
    targetOption.children = listHost.data;
    setOptions([...options]);
  };

  const onChangeIndice = (
    indices: string,
    hostname: string
  ) => {
    logSearchStore.onSetData({
      ...logSearchStore.data,
      indices,
      hostname: hostname ? [hostname] : [],
    });
  };

  useEffect(() => {
    if (listIndice.isError) {
      logSearchStore.onSetError(true);
    }

    if (listIndice.data) {
      const indicesList =
        (listIndice.data.data as Option[]) ?? [];

      const value = indicesList.map(
        ({ label, value }) => ({
          label,
          value,
          isLeaf: false,
        })
      );

      setOptions(() => {
        const optionList = options.filter(
          (item) => item.value !== 'loading'
        );

        return uniqBy(
          [...optionList, ...value],
          (item) => item.value
        );
      });

      logSearchStore.onSetData({
        ...logSearchStore.data,
        indices:
          options?.[0]?.value ??
          indicesList[0]?.value ??
          undefined,
      });

      const defaultIndice =
        indicesList?.[0]?.value ?? undefined;

      form.setFieldValue('indices', defaultIndice);
      logSearchStore.onSetLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listIndice.data, listIndice.isError]);

  useEffect(() => {
    const element = document.getElementsByClassName(
      'ant-cascader-menu'
    )[0];

    const handleScroll = () => {
      if (
        !listIndice.data ||
        listIndice.isLoading ||
        !listIndice.data?.meta
      )
        return;

      const { scrollTop, clientHeight, scrollHeight } =
        element;

      const meta = listIndice.data.meta;
      if (meta) {
        const { total_page = 1 } = meta;
        if (page >= total_page) return;
      }

      if (scrollTop + clientHeight === scrollHeight) {
        setOptions((state) => {
          if (state[state.length - 1].value === 'loading')
            return state;

          return [
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
          ];
        });

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
    <Form.Item
      label={
        <IntlMessage id="logManagement.indices.title" />
      }
      name="indices"
      className="mb-0"
    >
      <Cascader
        loading={listIndice.isLoading}
        loadData={getHostname}
        className={css`
          max-width: 100%;
        `}
        options={options}
        onDropdownVisibleChange={(value) =>
          setOpen(value)
        }
        onChange={([indice, hostname]) =>
          onChangeIndice(
            indice as string,
            hostname as string
          )
        }
        maxTagCount="responsive"
        allowClear={false}
        changeOnSelect
        placeholder={
          t('logManagement.selectPlaceholder', {
            field: t('logManagement.indices.title'),
          }) as string
        }
      />
    </Form.Item>
  );
};
