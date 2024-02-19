import { DeleteOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Menu,
  Popconfirm,
  Typography,
} from 'antd';

import { MaturityModelDetail } from '../../types';

export type MaturityModelManageDetailModalSideContentProps =
  {
    selectedKey?: string;
    maturityModels?: MaturityModelDetail[];
    onSelect?: (key: string) => void;
    onAddColumn?: () => void;
    onRemoveColumn?: (columnId: string) => void;
  };

export const MaturityModelManageDetailModalSideContent =
  ({
    selectedKey,
    maturityModels,
    onSelect,
    onAddColumn,
    onRemoveColumn,
  }: MaturityModelManageDetailModalSideContentProps) => {
    const maturityModelItems = maturityModels?.map(
      (maturityModel) => ({
        key: maturityModel.ObjectUUID,
        label: (
          <>
            <Typography.Text>
              {maturityModel.columnName}
            </Typography.Text>
            {selectedKey === maturityModel.ObjectUUID && (
              <Popconfirm
                title="คุณแน่ใจไหม?"
                onConfirm={() =>
                  onRemoveColumn?.(
                    maturityModel.ObjectUUID
                  )
                }
                placement="right"
              >
                <DeleteOutlined />
              </Popconfirm>
            )}
          </>
        ),
      })
    );

    return (
      <div className="w-100">
        <div className="p-3">
          <Button
            type="dashed"
            block
            onClick={onAddColumn}
          >
            เพิ่มคอลัมน์
          </Button>
        </div>
        <Menu
          mode="inline"
          className={css`
            .ant-menu-title-content {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .ant-typography {
                max-width: 245px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }

            .ant-menu-item-selected {
              .ant-typography {
                max-width: 200px;
                color: #3e79f7;
              }
            }
          `}
          items={maturityModelItems}
          selectedKeys={[selectedKey ?? '']}
          onSelect={({ key }) => onSelect?.(key)}
        />
      </div>
    );
  };
