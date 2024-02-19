import {
  Card,
  Descriptions,
  Table,
  Tabs,
  Tag,
} from 'antd';

import {
  ERROR_COLOR,
  PROCESSING_COLOR,
  BLACK_COLOR,
} from '@/config/color';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { DataLifecycleDataset } from '../../../../types';

export type BoardDatasetProps = {
  title: string | React.ReactNode;
  board: DataLifecycleDataset;
};

export const BoardDataset = ({
  title,
  board,
}: BoardDatasetProps) => {
  return (
    <Card title={title}>
      <Tabs>
        <Tabs.TabPane
          key="description"
          tab={
            <IntlMessage id="dataMapping.dataLifecycle.boardDataset.description" />
          }
        >
          <Descriptions
            className="w-full mb-4"
            labelStyle={{
              fontWeight: 'bold',
            }}
            column={1}
          >
            <Descriptions.Item
              label={
                <IntlMessage id="dataMapping.dataLifecycle.boardDataset.description.dataset" />
              }
            >
              {board.name && board.name !== ''
                ? board.name
                : '-'}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="dataMapping.dataLifecycle.boardDataset.description.group" />
              }
            >
              {board.group && board.group !== ''
                ? board.group
                : '-'}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="dataMapping.dataLifecycle.boardDataset.description.categoryClassification" />
              }
              labelStyle={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {board.categoryClassification
                ? board.categoryClassification.map(
                    (item) => (
                      <ShowTagStatus
                        key={item}
                        status={item}
                        items={[
                          {
                            label:
                              'dataMapping.activity.dataCategory.categoryClassification.generalData',
                            key: 'generalData',
                            color: BLACK_COLOR,
                          },
                          {
                            label:
                              'dataMapping.activity.dataCategory.categoryClassification.personalData',
                            key: 'personalData',
                            color: PROCESSING_COLOR,
                          },
                          {
                            label:
                              'dataMapping.activity.dataCategory.categoryClassification.sensitiveData',
                            key: 'sensitiveData',
                            color: ERROR_COLOR,
                          },
                        ]}
                      />
                    )
                  )
                : '-'}
            </Descriptions.Item>
          </Descriptions>
        </Tabs.TabPane>
        <Tabs.TabPane
          key="general"
          tab={
            <IntlMessage id="dataMapping.dataLifecycle.boardDataset.general" />
          }
        >
          <Table
            rowKey="dataElementID"
            columns={[
              {
                title: (
                  <IntlMessage id="dataMapping.dataLifecycle.boardDataset.general.dataElement" />
                ),
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: (
                  <IntlMessage id="dataMapping.dataLifecycle.boardDataset.general.classification" />
                ),
                dataIndex: 'classification',
                key: 'classification',
                render: (classification) => (
                  <>
                    {classification ===
                      'ข้อมูลส่วนบุคคลทั่วไป' && (
                      <Tag color="default">
                        <IntlMessage id="dataMapping.dataCategoryPicker.dataClassifications.generalData" />
                      </Tag>
                    )}
                    {classification ===
                      'ข้อมูลส่วนบุคคล' && (
                      <Tag color="processing">
                        <IntlMessage id="dataMapping.dataCategoryPicker.dataClassifications.personalData" />
                      </Tag>
                    )}
                    {classification ===
                      'ข้อมูลส่วนบุคคลอ่อนไหว' && (
                      <Tag color="error">
                        <IntlMessage id="dataMapping.dataCategoryPicker.dataClassifications.sensitiveData" />
                      </Tag>
                    )}
                  </>
                ),
              },
            ]}
            dataSource={board.dataElements}
            pagination={false}
            className="w-full mb-4"
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};
