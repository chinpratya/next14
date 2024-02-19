import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { IntlMessage } from '@utilComponents/intl-message';

import { DataCategoriesdataElementl } from '../../types';
type DataCategoriesRiskAssessmentRelatedInfoProps = {
  data: DataCategoriesdataElementl[];
};
export const DataCategoriesRiskAssessmentRelatedInfo = ({
  data,
}: DataCategoriesRiskAssessmentRelatedInfoProps) => {
  const columns: ColumnsType<DataCategoriesdataElementl> =
    [
      {
        title: (
          <IntlMessage id="dataMapping.dataCategories.riskAssessment.personalName" />
        ),
        dataIndex: 'name',
        width: 250,
      },
      {
        title: (
          <IntlMessage id="dataMapping.dataCategories.riskAssessment.personalName" />
        ),
        dataIndex: 'dataClassification',
        width: 100,
      },
    ];
  return (
    <>
      <Typography.Title
        level={4}
        style={{ fontWeight: 'bold' }}
      >
        <IntlMessage id="dataMapping.dataCategories.riskAssessment.personaInfo" />
      </Typography.Title>
      <Table columns={columns} dataSource={data ?? []} />
    </>
  );
};
