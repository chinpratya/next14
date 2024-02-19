import { css } from '@emotion/css';
import { Card } from 'antd';
import Scrollbars from 'react-custom-scrollbars';
import { ReactFlowProvider } from 'reactflow';

import { FallbackError } from '@utilComponents/fallback-error';

import { useGetCycleOfDataLifecycle } from '../../api/get-cycle-of-data-lifecycle';

import { Header, Flow } from './components';

export type DataLifecycleFlowProps = {
  dataLifecycleId: string;
};

const FLOW_COLUMNS: Record<string, string> = {
  dataSubject: 'Data Subject',
  collect: 'Collect',
  dataset: 'Dataset',
  process: 'Process',
  storage: 'Storage',
  tranfer: 'Transfer',
  destroy: 'Destroy',
};

export const DataLifecycleFlow = ({
  dataLifecycleId,
}: DataLifecycleFlowProps) => {
  const { data, isLoading, isError } =
    useGetCycleOfDataLifecycle({
      dataLifecycleId,
    });

  if (isLoading) {
    return <Card loading />;
  }

  const columns = Object.entries(FLOW_COLUMNS);

  return (
    <FallbackError isError={isError}>
      <div
        className={css`
          @media (max-width: 900px) {
            overflow-x: scroll;
          }

          margin-bottom: 20px;
        `}
      >
        <Card>
          <ReactFlowProvider>
            <Card
              loading={isLoading}
              className="ant-card-react-flow__renderer"
              title={<Header columns={columns} />}
              bordered={false}
            >
              <Scrollbars
                style={{
                  height: 'calc(100vh - 345px)',
                }}
              >
                <Flow
                  columns={columns.map(([key]) => key)}
                  flow={data}
                />
              </Scrollbars>
            </Card>
          </ReactFlowProvider>
        </Card>
      </div>
    </FallbackError>
  );
};
