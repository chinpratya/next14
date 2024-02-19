import { css } from '@emotion/css';
import {
  Card,
  Col,
  Form,
  FormInstance,
  Radio,
  Row,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListCountry } from '../../../../shared';
import { useGetMetaDataController } from '../../api/get-meta-data-controller';

import { DataControllerExternal } from './data-controller-external';
import { DataControllerInternal } from './data-controller-internal';

export type DataControllerFormProps = {
  form?: FormInstance;
  isCreate?: boolean;
};

export const DataControllerForm = ({
  form,
  isCreate,
}: DataControllerFormProps) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } =
    useGetMetaDataController();
  const country = useListCountry();
  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:dataprocessor:update'],
    ],
  });

  const position = data?.position;
  const organizationType = data?.organizationType;
  const personalType = data?.personalType;

  return (
    <FallbackError isError={isError} borderLess>
      <Card
        title={
          <IntlMessage id="dataMapping.dataController.create.basicInfo" />
        }
        loading={isLoading && country.isLoading}
      >
        <Form
          disabled={!editPermission.isAllow}
          form={form}
          initialValues={{
            tel: '',
            url: '',
            note: '',
            county:
              '87b39a1c-9fc6-4618-a5ad-706965063614',
            countryID:
              '87b39a1c-9fc6-4618-a5ad-706965063614',
          }}
          layout="vertical"
          className={css`
            .ant-form-item-label > label {
              font-weight: bold !important;
            }
          `}
          onValuesChange={(changedValues, allValues) => {
            if (
              changedValues?.organizationName &&
              allValues?.type === 'JuristicPerson'
            ) {
              form?.setFieldsValue({
                name: changedValues.organizationName,
              });
            }
            if (
              changedValues?.type &&
              allValues?.dataControllerSideType ===
                'internal'
            ) {
              form?.setFieldsValue({
                name: '',
              });
            }
          }}
        >
          <Row>
            <Col {...getColLayout(24)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.dataController.create.dataController" />
                }
                name="positionID"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.dataController.create.dataControllerRequired'
                    )
                  ),
                ]}
              >
                <Radio.Group
                  options={position?.map((item) => ({
                    label:
                      item.name === 'receipt'
                        ? 'ผู้ที่เกี่ยวข้อง'
                        : item.name,
                    value: item.ObjectUUID,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col {...getColLayout(24)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.dataController.create.organizationType" />
                }
                name="organizationTypeID"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.dataController.create.organizationTypeRequired'
                    )
                  ),
                ]}
              >
                <Radio.Group>
                  {organizationType?.map((item) => (
                    <Radio
                      key={item.ObjectUUID}
                      value={item.ObjectUUID}
                    >
                      {item.name}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col {...getColLayout(24)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.dataController.create.type" />
                }
                name="personalTypeID"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.dataController.create.typeRequired'
                    )
                  ),
                ]}
              >
                <Radio.Group>
                  {personalType?.map((item) => (
                    <Radio
                      key={item.ObjectUUID}
                      value={item.ObjectUUID}
                    >
                      {item.name}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.organizationTypeID !==
                currentValues.organizationTypeID ||
              prevValues.personalTypeID !==
                currentValues.personalTypeID
            }
          >
            {({ getFieldValue }) => {
              const organizationTypeID = getFieldValue(
                'organizationTypeID'
              );
              const personalTypeID = getFieldValue(
                'personalTypeID'
              );

              if (
                !organizationTypeID ||
                !personalTypeID
              ) {
                return null;
              }

              const organizationTypeData =
                organizationType?.find(
                  (item) =>
                    item.ObjectUUID === organizationTypeID
                );
              const personalTypeData = personalType?.find(
                (item) =>
                  item.ObjectUUID === personalTypeID
              );

              if (
                !organizationTypeData ||
                !personalTypeData
              ) {
                return null;
              }

              const isInternal =
                organizationTypeData.name.includes(
                  'ภายใน'
                );

              const isPerson =
                personalTypeData.name === 'บุคคล';

              return isInternal ? (
                <DataControllerInternal
                  form={form}
                  isPerson={isPerson}
                  isCreate={isCreate}
                />
              ) : (
                <DataControllerExternal
                  isPerson={isPerson}
                />
              );
            }}
          </Form.Item>
        </Form>
      </Card>
    </FallbackError>
  );
};
