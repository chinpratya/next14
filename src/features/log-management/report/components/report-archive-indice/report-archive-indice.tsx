import { Card, Empty } from 'antd';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';

import { useListArchiveIndice } from '../../api/list-archive-indice';
import { ReportFilter } from '../../types';

import { ReportArchiveIndiceTable } from './report-archive-indice-table';

type ReportArchiveIndiceProps = {
  filter: ReportFilter;
};

export const ReportArchiveIndice = ({
  filter,
}: ReportArchiveIndiceProps) => {
  const { data, isLoading, isError } =
    useListArchiveIndice({
      module: 'LM',
      type: 'csv',
      report_type: 'indices',
      filter: {
        from: filter.timestamp.from,
        to: filter.timestamp.to,
        indices: filter.indices,
        hosts: [],
        type: 'archive',
        limit: 10,
      },
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="logManagement.report.archiveByIndices" />
        }
        loading={isLoading}
      >
        {data && Object.keys(data).length > 0 ? (
          <ReportArchiveIndiceTable
            data={data}
            loading={isLoading}
          />
        ) : (
          <Empty />
        )}
      </Card>
    </FallbackError>
  );
};
