import { Card } from 'antd';
import { useEffect } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePagination } from '@/hooks';

import { useListDownload } from '../../api/list-download';

import { ReportDownloadTable } from './report-download-table';

type ReportDownloadListProps = {
  tab: string;
};

export const ReportDownloadList = ({
  tab,
}: ReportDownloadListProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading, refetch } =
    useListDownload({
      page,
      pageSize,
    });

  const totalRecord =
    (data?.meta?.total_page || 1) * pageSize;

  const onDownload = (path: string) => {
    if (path === '') return;

    const aTag = document.createElement('a');
    aTag.href = path;
    aTag.target = '_blank';
    aTag.click();
    aTag.remove();
  };

  useEffect(() => {
    if (tab === 'downloadList') refetch();
  }, [refetch, tab]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="logManagement.report.dowloadList.title" />
        }
      >
        <ReportDownloadTable
          dataSource={data?.data ?? []}
          loading={isLoading}
          page={page}
          onDownload={onDownload}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
