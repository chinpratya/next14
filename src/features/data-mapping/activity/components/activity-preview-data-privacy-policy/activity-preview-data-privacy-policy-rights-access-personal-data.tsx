import { Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { IntlMessage } from '@utilComponents/intl-message';

import { ActivityPreview } from '../../types';
import { Tooltip } from '@mantine/core';

export type ActivityPreviewDataPrivacyPolicyRightsAccessPersonalDataProps =
  {
    data?: ActivityPreview;
  };

export const ActivityPreviewDataPrivacyPolicyRightsAccessPersonalData =
  ({
    data,
  }: ActivityPreviewDataPrivacyPolicyRightsAccessPersonalDataProps) => {
    const columns: ColumnsType<Record<string, unknown>> =
      [
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.org" />
          ),
          dataIndex: 'organizationName',
          key: 'organizationName',
          width: 200,
          render: (organizationName) =>
            _.map(organizationName, (v) => (
              <Tooltip label={v}>
                <Tag
                  key={v}
                  className="mx-1 my-1"
                  style={{
                    borderRadius: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'block',
                      maxWidth: '200px',
                      wordWrap: 'break-word',
                    }}
                  >
                    <Typography.Text ellipsis>
                      {v}
                    </Typography.Text>
                  </div>
                </Tag>
              </Tooltip>
            )),
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.purpose" />
          ),
          dataIndex: 'elements',
          key: 'elements',
          width: 150,
          render: (elements) =>
            _.map(elements, (v) => (
              <Tooltip label={v?.purposeName}>
                <Tag
                  key={v?.purposeName}
                  className="mx-1 my-1"
                  style={{
                    borderRadius: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'block',
                      width: '150px',
                      wordWrap: 'break-word',
                    }}
                  >
                    <Typography.Text ellipsis>
                      {v?.purposeName}
                    </Typography.Text>
                  </div>
                </Tag>
              </Tooltip>
            )),
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.element" />
          ),
          dataIndex: 'elements',
          key: 'elements',
          width: 150,
          render: (elements) =>
            _.map(elements, (v, elementIndex) =>
              _.map(
                v?.subelements?.dataElementName,
                (e) => (
                  <Tooltip label={e}>
                    <Tag
                      key={`${elementIndex}-${e}`}
                      className="mx-1 my-1"
                      style={{
                        borderRadius: '20px',
                      }}
                    >
                      <div
                        style={{
                          display: 'block',
                          maxWidth: '150px',
                          wordWrap: 'break-word',
                        }}
                      >
                        <Typography.Text ellipsis>
                          {e}
                        </Typography.Text>
                      </div>
                    </Tag>
                  </Tooltip>
                )
              )
            ),
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.dataCategory" />
          ),
          dataIndex: 'elements',
          key: 'elements',
          width: 150,
          render: (elements) =>
            _.map(elements, (v, elementIndex) =>
              _.map(
                v?.subelements?.dataCategoryName,
                (e) => (
                  // <Tag
                  //   key={`${elementIndex}-${e}`}
                  //   className="mx-1 my-1"
                  //   style={{ borderRadius: '20px' }}
                  // >
                  //   {e}
                  // </Tag>
                  <Tooltip label={e}>
                    <Tag
                      key={`${elementIndex}-${e}`}
                      className="mx-1 my-1"
                      style={{
                        borderRadius: '20px',
                      }}
                    >
                      <div
                        style={{
                          display: 'block',
                          maxWidth: '150px',
                          wordWrap: 'break-word',
                        }}
                      >
                        <Typography.Text ellipsis>
                          {e}
                        </Typography.Text>
                      </div>
                    </Tag>
                  </Tooltip>
                )
              )
            ),
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.description" />
          ),
          dataIndex: 'description',
          key: 'description',
          width: 150,
        },
      ];

    return (
      <>
        <Typography.Title
          level={4}
          style={{ fontWeight: 'bold' }}
        >
          <IntlMessage id="dataMapping.activity.preview.privacyPolicy.rights.title" />
        </Typography.Title>
        <Table
          className="mb-4"
          rowKey={() => uuidv4()}
          columns={columns}
          scroll={{ x: 450, y: 270 }}
          tableLayout="fixed"
          dataSource={data?.access ?? []}
          pagination={false}
          bordered
        />
      </>
    );
  };
