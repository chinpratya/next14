import {
  Col,
  Form,
  Row,
  Table,
  Transfer,
  Typography,
} from 'antd';
import type {
  ColumnsType,
  TableRowSelection,
} from 'antd/es/table/interface';
import type {
  TransferItem,
  TransferProps,
} from 'antd/es/transfer';
import _ from 'lodash';
import difference from 'lodash/difference';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { usePagination } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetOrganizationUnitAssessmentApprover } from '../../api/get-organization-unit-assessment-approver';
import { useListOrganizationUnitAssessmentApproverRespondent } from '../../api/list-organization-unit-assessment-approver-respondent';
import { useListOrganizationUnitListRespondents } from '../../api/list-organization-unit-list-respondents';
import { useUpdateOrganizationUnitAssessmentApproverRespondent } from '../../api/update-organization-unit-assessment-approver-respondent';
import { OrganizationUnitApproverRespondent } from '../../types';

interface TableTransferProps
  extends TransferProps<TransferItem> {
  dataSource?: OrganizationUnitApproverRespondent[];
  leftColumns: ColumnsType<object>;
  rightColumns: ColumnsType<object>;
}

export type OrganizationBasicInfoUnitAssessmentApproverModalRespondentProps =
  {
    organizationId: string;
    instituteId: string;
    approverId: string;
    open: boolean;
    onCancel: () => void;
  };

export const OrganizationBasicInfoUnitAssessmentApproverModalRespondent =
  ({
    organizationId,
    instituteId,
    approverId,
    open,
    onCancel,
  }: OrganizationBasicInfoUnitAssessmentApproverModalRespondentProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();
    const [dataRespondents, setDataRespondents] =
      useState<OrganizationUnitApproverRespondent[]>([]);

    const {
      page,
      pageSize,
      onPaginationChange,
      Pagination,
    } = usePagination({ pageSize: 1000 });

    const approver =
      useGetOrganizationUnitAssessmentApprover(
        organizationId,
        instituteId,
        approverId
      );

    const { data, isLoading, isError } =
      useListOrganizationUnitAssessmentApproverRespondent(
        {
          organizationId,
          instituteId,
          approverId,
        }
      );

    const {
      data: dataListRespondents,
      isLoading: LoadingRespondents,
    } = useListOrganizationUnitListRespondents({
      organizationId,
      instituteId,
      page,
      pageSize,
    });

    useEffect(() => {
      if (dataListRespondents && data) {
        const ResponseFilter = _.filter(
          dataListRespondents.data,
          (item) => !item.approverName
        );
        const find = _.filter(
          dataListRespondents.data,
          (obj) => _.includes(data.data, obj.ObjectUUID)
        );

        const ListRespondentsOptions =
          ResponseFilter.concat(find);

        const listRespondents: OrganizationUnitApproverRespondent[] =
          _.map(ListRespondentsOptions, (value) => {
            return {
              key: value.ObjectUUID,
              name: value.name,
              position: value.position,
            };
          });
        setDataRespondents(listRespondents);
      }
    }, [dataListRespondents, data]);

    const updateRespondent =
      useUpdateOrganizationUnitAssessmentApproverRespondent(
        {
          organizationId,
          instituteId,
          approverId,
          onSuccess: () => {
            showNotification({
              type: 'success',
              message: t(
                'compliance.notification.organization.branch.approver.respondent.update'
              ) as string,
            });
            onCancel();
          },
        }
      );

    const onUpdateRespondent = async () => {
      await form.validateFields();
      console.log('onUpdateRespondent-value', targetKeys);

      updateRespondent.submit(targetKeys);
    };

    const TableTransfer = ({
      leftColumns,
      rightColumns,
      ...restProps
    }: TableTransferProps) => (
      <Transfer {...restProps}>
        {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
        }) => {
          const columns =
            direction === 'left'
              ? leftColumns
              : rightColumns;

          const rowSelection: TableRowSelection<TransferItem> =
            {
              onSelectAll(selected, selectedRows) {
                const treeSelectedKeys = selectedRows
                  .filter((item) => !item.disabled)
                  .map(({ key }) => key);
                const diffKeys = selected
                  ? difference(
                      treeSelectedKeys,
                      listSelectedKeys
                    )
                  : difference(
                      listSelectedKeys,
                      treeSelectedKeys
                    );
                onItemSelectAll(
                  diffKeys as string[],
                  selected
                );
              },
              onSelect({ key }, selected) {
                onItemSelect(key as string, selected);
              },
              selectedRowKeys: listSelectedKeys,
            };

          return (
            <>
              <Table
                loading={LoadingRespondents}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredItems}
                size="small"
                pagination={
                  direction === 'left'
                    ? false
                    : { pageSize }
                }
              />
              {direction === 'left' ? (
                <Pagination
                  current={page}
                  total={dataListRespondents?.totalRecord}
                  pageSize={pageSize}
                  onChange={onPaginationChange}
                />
              ) : null}
            </>
          );
        }}
      </Transfer>
    );

    const [targetKeys, setTargetKeys] = useState<
      string[]
    >([]);
    useEffect(() => {
      if (data) {
        setTargetKeys(data.data);
      }
    }, [data]);
    const onChange = (nextTargetKeys: string[]) => {
      console.log('targetKeys:', nextTargetKeys);
      setTargetKeys(nextTargetKeys);
    };

    const tableColumns = [
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.select.name" />
        ),
        dataIndex: 'name',
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.select.position" />
        ),
        dataIndex: 'position',
      },
    ];

    return (
      <Modal
        title={
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.select.title" />
        }
        isError={isError}
        loading={isLoading}
        open={open}
        onCancel={onCancel}
        width={1000}
        onOk={onUpdateRespondent}
        okButtonProps={{
          loading: updateRespondent.isLoading,
        }}
      >
        <Row gutter={[16, 0]}>
          <Col span={12}>
            <Flex justifyContent="center">
              <Typography.Text strong className="mb-3">
                <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.select.respondent" />
              </Typography.Text>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex justifyContent="center">
              <Typography.Text strong className="mb-3">
                <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.select.approver" />{' '}
                :{' '}
              </Typography.Text>
              <Typography.Text>
                {approver?.data?.name}
              </Typography.Text>
            </Flex>
          </Col>
        </Row>
        <TableTransfer
          dataSource={dataRespondents ?? []}
          targetKeys={targetKeys}
          showSearch
          onChange={onChange}
          filterOption={(inputValue, item) =>
            item.name.indexOf(inputValue) !== -1 ||
            item.position.indexOf(inputValue) !== -1
          }
          leftColumns={tableColumns}
          rightColumns={tableColumns}
        />
      </Modal>
    );
  };
