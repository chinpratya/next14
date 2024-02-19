import { Form, Input, Select } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearch } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDataMappingOrganizations } from '../../../organization/api/list-data-mapping-organizations';
import { useGetActivityCollectMeta } from '../../api/get-activity-collect-meta';
import { useGetActivityCollectAccess } from '../../api/get-activity-collect-of-activty-access';
import { useUpdateActivityCollectAccess } from '../../api/update-activity-collect-of-activty-access';

import { SelectDropdownAccess } from './select-dropdown-access';

type ModalDetailAccessPersonalInformationProps = {
  open: boolean;
  onClose: () => void;
  activityId: string;
  accessId: string;
};

export const ModalDetailAccessPersonalInformation = ({
  open,
  onClose,
  activityId,
  accessId,
}: ModalDetailAccessPersonalInformationProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();
  const { debouncedSearch, search, onSearch } =
    useSearch();

  const { data } = useGetActivityCollectMeta({
    activityId,
  });

  const detail = useGetActivityCollectAccess({
    activityId,
    accessId,
  });

  useEffect(() => {
    if (accessId && detail.data) {
      const elements = detail?.data?.elements?.map(
        (v) => {
          return {
            basisID: v.basisID,
            dataCategoryID: v.dataCategoryID,
            dataElementID: v.dataElementID,
            purposeID: v.purposeID,
          };
        }
      );

      form.setFieldsValue({
        ...detail.data,
        elements,
      });
    }
  }, [accessId, detail, form]);

  const updateAccess = useUpdateActivityCollectAccess({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.collect.rightsAndMethodAccessPersonalInformation.update'
        ) as string,
      });
      onClose?.();
    },
    activityId,
    accessId,
  });

  const listOrganization =
    useListDataMappingOrganizations({
      search: debouncedSearch,
    });

  const organizationOption =
    listOrganization?.data?.data.map((item) => ({
      value: item.entityId,
      label: item.name,
    }));

  const onSubmit = async () => {
    // await form.validateFields();
    const value = form.getFieldValue('elements');
    const elements = _.map(value, (v) => {
      const basisID = data?.find(
        (d) => d.purposeID === v?.purposeID
      );
      return { ...v, basisID: basisID?.basisID ?? '' };
    });
    const payload = {
      ...form.getFieldsValue(),
      elements,
    };
    updateAccess.submit(payload);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.detail.title" />
      }
      onOk={onSubmit}
      afterClose={form.resetFields}
      okButtonProps={{ loading: updateAccess.isLoading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.add.element" />
          }
          name="elements"
          rules={[
            validation.required(
              t(
                'dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.add.elementRequired'
              )
            ),
          ]}
        >
          <SelectDropdownAccess activityId={activityId} />
        </Form.Item>

        <Form.Item
          label={
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.add.organizationID" />
          }
          name="organizationID"
          rules={[
            validation.required(
              t(
                'dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.add.organizationIDRequired'
              )
            ),
          ]}
        >
          <Select
            mode="tags"
            showSearch
            searchValue={search}
            autoClearSearchValue
            onSearch={onSearch}
            options={organizationOption ?? []}
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label={
            <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.add.description" />
          }
          name="description"
          initialValue={''}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
