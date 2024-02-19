import { Descriptions } from 'antd';

import { ShowTagDate } from '@/components/share-components/show-tag-date';

import { DataMappingOrganizations } from '../../types';

export type OrganizationDetailDescriptionProps = {
  data?: DataMappingOrganizations;
};
export const OrganizationDetailDescription = ({
  data,
}: OrganizationDetailDescriptionProps) => {
  return (
    <Descriptions
      className="mt-3"
      column={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      layout="vertical"
    >
      <Descriptions.Item label="วันที่สร้าง">
        <ShowTagDate date={data?.createdDt ?? ''} />
      </Descriptions.Item>
      <Descriptions.Item label="สร้างโดย">
        {data?.createdBy && data?.createdBy !== ''
          ? data?.createdBy
          : '-'}
      </Descriptions.Item>
      <Descriptions.Item label="วันที่แก้ไข">
        <ShowTagDate date={data?.updatedDt ?? ''} />
      </Descriptions.Item>
      <Descriptions.Item label="แก้ไขโดย">
        {data?.updatedBy && data?.updatedBy !== ''
          ? data?.updatedBy
          : '-'}
      </Descriptions.Item>
    </Descriptions>
  );
};
