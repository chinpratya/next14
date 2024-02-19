import { Form, Input, Select } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { useSearch } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDataMappingOrganizations } from '../../../organization/api/list-data-mapping-organizations';
import { useAddActivityCollectAccess } from '../../api/add-activity-collect-of-activty-access';
import { useGetActivityCollectMeta } from '../../api/get-activity-collect-meta';

import { SelectDropdownAccess } from './select-dropdown-access';

export type ModalAddCollectRightsAndMethodAccessPersonalInformationProps =
  {
    open: boolean;
    onClose: () => void;
    activityId: string;
  };

export const ModalAddCollectRightsAndMethodAccessPersonalInformation =
  ({
    open,
    onClose,
    activityId,
  }: ModalAddCollectRightsAndMethodAccessPersonalInformationProps) => {
    const { t } = useTranslation();
    const { showNotification } = useNotifications();
    const [form] = Form.useForm();
    const { debouncedSearch, search, onSearch } =
      useSearch();

    const { data } = useGetActivityCollectMeta({
      activityId,
    });

    const addActivityCollectAccess =
      useAddActivityCollectAccess({
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'dataMapping.notification.activity.collect.rightsAndMethodAccessPersonalInformation.add'
            ) as string,
          });
          onClose?.();
        },
        activityId,
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
      await form.validateFields();
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

      addActivityCollectAccess.submit(payload);
    };

    return (
      <Modal
        open={open}
        onCancel={onClose}
        title={
          <IntlMessage id="dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.add.title" />
        }
        onOk={onSubmit}
        afterClose={form.resetFields}
        okButtonProps={{
          loading: addActivityCollectAccess.isLoading,
        }}
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
            <SelectDropdownAccess
              activityId={activityId}
            />
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
