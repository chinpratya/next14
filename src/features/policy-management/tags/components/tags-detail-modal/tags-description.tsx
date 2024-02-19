import { Descriptions } from 'antd';

import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { Tag } from '../../types';

export type TagsDescriptionProps = {
  data?: Tag;
};

export const TagsDescription = ({
  data,
}: TagsDescriptionProps) => {
  return (
    <Descriptions
      layout="vertical"
      labelStyle={{ fontWeight: 'bold' }}
      column={2}
    >
      <Descriptions.Item
        label={
          <IntlMessage id="policyManagement.tag.createdDt" />
        }
      >
        {data?.createdDt ? (
          <ShowTagDate date={data.createdDt} />
        ) : (
          '-'
        )}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="policyManagement.tag.createdBy" />
        }
      >
        {data?.createdBy ?? '-'}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="policyManagement.tag.updatedDt" />
        }
      >
        {data?.updatedDt ? (
          <ShowTagDate date={data.updatedDt} />
        ) : (
          '-'
        )}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="policyManagement.tag.updatedBy" />
        }
      >
        {data?.updatedBy ?? '-'}
      </Descriptions.Item>
    </Descriptions>
  );
};
