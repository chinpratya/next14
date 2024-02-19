import {
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Table,
  Card,
  Tag,
  Typography,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { saveAs } from 'file-saver';

import {
  usePagination,
  useColumnFiltered,
  useSearch,
  useToggle,
  useFilter,
  usePermission,
} from '@/hooks';
// import { createExcel } from '@/shared';
import { permissions } from '@/permissions';
import { DropdownTable } from '@components/dropdown-table';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListTags } from '../../../tags/api/list-tags';
import { getRopaExport } from '../../api/get-ropa-export';
import { useListRopa } from '../../api/list-ropa';
import { Ropa } from '../../types';
import { RopaDetailModal } from '../ropa-detail-modal';

export const RopaList = () => {
  const toggle = useToggle();
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { filters, columnFilter, filterDropdown } =
    useFilter<Ropa>();

  const {
    filters: filtersActorType,
    columnFilter: columnFilterActorType,
    filterDropdown: filterDropdownActorType,
  } = useFilter<Ropa>();
  const listTag = useListTags({});
  const { data, isLoading, isError } = useListRopa({
    page,
    pageSize,
    search: debouncedSearch,
    ...filters,
    ...filtersActorType,
  });

  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [permissions['pdpakit:datamap:ropa:read']],
  });

  const onExport = async (ropaId: string) => {
    const hide = message.loading('กำลังส่งออกข้อมูล');
    try {
      const { url } = await getRopaExport(ropaId);

      // await createExcel(
      //   _.get(response, `data`, []) as Record<
      //     string,
      //     unknown
      //   >[],
      //   `รายละเอียดข้อมูล ROPA ${ropaId}`
      // );
      saveAs(url, 'download.xlsx');
      hide();
      message.success('ส่งออกข้อมูลสำเร็จ');
    } catch (error) {
      console.error(error);
      hide();
      message.error('ไม่สามารถส่งออกข้อมูลได้');
    }
  };

  const columns: ColumnsType<Ropa> = [
    {
      title: <IntlMessage id="dataMapping.ropa.ropaId" />,
      key: 'ropaID',
      width: 100,
      ellipsis: true,
      render: (ropa: Ropa) => (
        <Typography.Link
          onClick={() => toggle.edit(ropa)}
          disabled={!readPermission.isAllow}
        >
          {ropa?.ropaID}
        </Typography.Link>
      ),
    },
    {
      title: <IntlMessage id="dataMapping.ropa.name" />,
      key: 'name',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.version" />
      ),
      dataIndex: 'version',
      key: 'version',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.actorType" />
      ),
      dataIndex: 'actorType',
      key: 'actorType',
      width: 150,
      ...columnFilterActorType('filter'),
      filters: [
        {
          text: 'ผู้ควบคุมข้อมูลส่วนบุคคล(DC)',
          value: 'data-controller',
        },
        {
          text: 'ผู้ประมวลผลข้อมูล(DP)',
          value: 'data-processor',
        },
      ],
      filterDropdown:
        filterDropdownActorType('actorType'),

      render: (actorTypes: string[]) =>
        actorTypes.map((actorType, index) => (
          <Tag
            key={`ropa-actorType-${index}`}
            className={css`
              margin: auto;
            `}
          >
            {actorType}
          </Tag>
        )),
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.createdDt" />
      ),
      dataIndex: 'created_dt',
      key: 'created_dt',
      width: 150,
      render: (date) => <ShowTagDate date={date} />,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.updatedDt" />
      ),
      dataIndex: 'updated_dt',
      key: 'updated_dt',
      width: 150,
      render: (date) => <ShowTagDate date={date} />,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.tags" />
      ),
      dataIndex: 'tagName',
      key: 'tagName',
      align: 'left',
      width: 200,
      ...columnFilter('filter'),
      filters: listTag.data?.data?.map((value) => ({
        text: value.name,
        value: value.tagID,
      })),
      filterDropdown: filterDropdown('tagID'),
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (ropa: Ropa) => (
        <DropdownTable
          items={[
            {
              label: 'ดูรายละเอียด',
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => toggle.edit(ropa),
              disabled: !readPermission.isAllow,
            },
            {
              label: 'ส่งออกข้อมูล',
              key: 'export',
              icon: <UploadOutlined />,
              onClick: () => onExport(ropa.ropaID),
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumnsKeys, ColumnTransfer } =
    useColumnFiltered({
      columns,
      disabledKeys: ['ropaID'],
    });

  const filteredColumns = columns.filter((column) =>
    filteredColumnsKeys.includes(column.key as string)
  );
  return (
    <FallbackError isError={isError}>
      <Card>
        <Flex justifyContent="end">
          <InputSearch
            search={search}
            onSearch={onSearch}
            className="mr-2"
          />
          {ColumnTransfer}
        </Flex>
        <Table
          rowKey="ropaID"
          scroll={{ x: 750 }}
          tableLayout="fixed"
          columns={filteredColumns}
          loading={isLoading}
          dataSource={data?.data ?? []}
          pagination={false}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalRecord}
          onChange={onPaginationChange}
        />
        <RopaDetailModal
          open={toggle.openEdit}
          onCancel={() => toggle.edit()}
          ropaId={toggle.data?.ropaID}
        />
      </Card>
    </FallbackError>
  );
};
