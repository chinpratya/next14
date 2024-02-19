import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Empty,
  Skeleton,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { InputSearch } from '@/components/share-components/input-search';
import { Modal } from '@/components/share-components/modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useSearch } from '@/hooks';

import { useReadLogFile } from '../../api/read-log-file';
import { Directory } from '../../types';

type ExplorerFileDetailModalProps = {
  open: boolean;
  directory?: Directory;
  onCancel?: () => void;
};

export const ExplorerFileDetailModal = ({
  directory,
  open,
  onCancel,
  ...rest
}: ExplorerFileDetailModalProps) => {
  const { t } = useTranslation();

  const { data, isError, isLoading } = useReadLogFile({
    fileId: directory?.id as string,
    enabled: open,
  });

  const { debouncedSearch, search, onSearch } = useSearch(
    {
      debounce: 700,
    }
  );

  useEffect(() => {
    const onHighlight = () => {
      let keyword = debouncedSearch;
      const text = document.getElementById('text');
      const special = /[\\[{().+*?|^$]/g;

      if (!text) return;

      if (keyword !== '') {
        if (special.test(keyword)) {
          keyword = keyword.replace(special, '\\$&');
        }

        const regExp = new RegExp(keyword, 'gi');
        text.innerHTML = text.textContent?.replace(
          regExp,
          (match) => `<mark>${match}</mark>`
        ) as string;
      } else {
        text.innerHTML = data as string;
      }

      const textWrapper =
        document.getElementById('text-wrapper');
      const firstMark =
        document.getElementsByTagName('mark')[0];

      if (firstMark && textWrapper) {
        textWrapper.scrollTo(
          0,
          firstMark.offsetTop - 200
        );
      }
    };

    if (data) onHighlight();
  }, [data, debouncedSearch]);

  return (
    <Modal
      title={
        <>
          <Typography.Text strong className="mr-1">
            <IntlMessage id="logManagement.detail" /> :
          </Typography.Text>
          <Typography.Text
            style={{ maxWidth: 500, fontWeight: 400 }}
            ellipsis={{ tooltip: directory?.name }}
          >
            {directory?.name}
          </Typography.Text>
        </>
      }
      open={open}
      width={750}
      okButtonProps={{ hidden: true }}
      footer={
        <Flex align="center" justify="space-between">
          <Typography.Text className="mb-0">
            <IntlMessage
              id="logManagement.explorer.lineLimit"
              options={{ value: 100 }}
            />
          </Typography.Text>
          <Button onClick={onCancel}>
            <IntlMessage id="logManagement.close" />
          </Button>
        </Flex>
      }
      destroyOnClose
      cancelText={
        <IntlMessage id="logManagement.close" />
      }
      afterClose={() => onSearch('')}
      onCancel={onCancel}
      {...rest}
    >
      <FallbackError isError={isError}>
        <InputSearch
          className="mt-3 w-100"
          value={search}
          placeholder={
            t('logManagement.search') as string
          }
          onSearch={onSearch}
        />
        {isLoading ? (
          <Skeleton
            className="mt-4"
            paragraph={{ rows: 10 }}
          />
        ) : (
          <div
            id="text-wrapper"
            className={css`
              padding: 15px 0 15px 15px;
              margin: 18px 0;
              border: 1px solid #cfd8dc;
              border-radius: 10px;
              max-height: 60vh;
              overflow-y: scroll;
            `}
          >
            <p
              className={css`
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                color: #1a3353;
                margin: 0;
                white-space: break-spaces;

                mark {
                  padding: 0;
                  background-color: #fffd00;
                }
              `}
              id="text"
            >
              {!!data ? data : <Empty />}
            </p>
          </div>
        )}
      </FallbackError>
    </Modal>
  );
};
