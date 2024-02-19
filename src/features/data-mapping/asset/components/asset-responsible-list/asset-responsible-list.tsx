import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { useToggle, usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateAssetResponsible } from '../../api/create-asset-responsible';
import { useDeleteAssetResponsible } from '../../api/delete-asset-responsible';
import { useListAssetResonsible } from '../../api/list-asset-responsible';
import { AssetResponsible } from '../../types';
import { AssetAddResponsibleModal } from '../asset-add-responsible-modal/asset-add-responsible-modal';

type AssetResponsibleProps = {
  assetId: string;
};

export const AssetResponsibleList = ({
  assetId,
}: AssetResponsibleProps) => {
  const { t } = useTranslation();
  const toggle = useToggle<AssetResponsible>();
  const { showNotification } = useNotifications();

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:asset:update'],
    ],
  });

  const { data, isError, isLoading } =
    useListAssetResonsible({ assetId });

  const createResponsible = useCreateAssetResponsible({
    assetId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.asset.responsible.add'
        ) as string,
      });
      toggle.create();
    },
  });

  const deleteResponsible = useDeleteAssetResponsible({
    assetId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.asset.responsible.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<AssetResponsible> = [
    {
      title: (
        <IntlMessage id="dataMapping.asset.detail.responsible.name" />
      ),
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: (
        <IntlMessage id="dataMapping.asset.detail.responsible.email" />
      ),
      key: 'email',
      dataIndex: 'email',
    },
    {
      key: 'delete',
      width: 150,
      render: (responsible: AssetResponsible) => (
        <Typography.Text
          className={css`
            cursor: pointer;
          `}
          onClick={() => toggle.remove(responsible)}
        >
          <DeleteOutlined />{' '}
          <IntlMessage id="dataMapping.asset.detail.responsible.remove" />
        </Typography.Text>
      ),
    },
  ];

  const onCreateResponsible = (responsible: string[]) => {
    createResponsible.submit({
      assetId,
      responsibleId: responsible,
    });
  };

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.asset.detail.responsible.title" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={toggle.create}
            disabled={!editPermission.isAllow}
          >
            {' '}
            <IntlMessage id="dataMapping.asset.detail.responsible.select" />
          </Button>
        }
      >
        <Table
          rowKey="email"
          dataSource={data?.data}
          columns={columns}
          pagination={false}
          loading={isLoading}
        />

        <AssetAddResponsibleModal
          open={toggle.openCreate}
          loading={createResponsible.isLoading}
          listResponsible={data?.data}
          onCancel={toggle.create}
          onSubmit={onCreateResponsible}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name as string}
          loading={deleteResponsible.isLoading}
          data={toggle.data}
          onCancel={() => toggle.remove()}
          onDelete={(data) =>
            deleteResponsible.submit({
              assetId,
              responsibleId:
                data?.responsibleID as string,
            })
          }
        />
      </Card>
    </FallbackError>
  );
};
