import {
  Button,
  Col,
  Collapse,
  Descriptions,
  Divider,
  Form,
  Radio,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SUCCESS_COLOR } from '@/config/color';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { getColLayout, validation } from '@/utils';
import { Flex } from '@components/flex';
import { TagItems } from '@components/tag-items';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { UploadFiles } from '../../../../shared';
import { useGetActivityMeta } from '../../api/get-activity-meta';
import { useListDisclosurePurposeDestinationOfActivity } from '../../api/list-disclosure-purpose-destination-of-activity';
import { useUpdateDisclosurePurposeDestinationOfActivity } from '../../api/update-disclosure-purpose-destination-of-activity';
import { ActivityDisclosurePurposeDestination } from '../../types';

import { ActivityDisclosurePurposeDestinationMeasure } from './activity-disclosure-purpose-destination-measure';

export type ActivityDisclosurePurposeDestinationProps = {
  activityId: string;
  purposeId: string;
  destination: ActivityDisclosurePurposeDestination;
};

export type ActivityDisclosurePurposeDestinationListProps =
  {
    activityId: string;
    purposeId: string;
  };

const colors = {
  public: {
    label: 'เปิดเผย',
    color: SUCCESS_COLOR,
  },
  transfer: {
    label: 'โอน',
    color: '#FADB14',
  },
} as Record<
  string,
  {
    label: string;
    color: string;
  }
>;

export const ActivityDisclosurePurposeDestinationDetail =
  ({
    activityId,
    purposeId,
    destination,
  }: ActivityDisclosurePurposeDestinationProps) => {
    const { t } = useTranslation();
    const { showNotification } = useNotifications();
    const [form] = Form.useForm();

    const editPermission = usePermission({
      moduleName: 'datamap',
      policies: [
        permissions['pdpakit:datamap:activity:update'],
      ],
    });

    const updateDisclosurePurposeDestinationOfActivity =
      useUpdateDisclosurePurposeDestinationOfActivity({
        activityId,
        purposeId: purposeId,
        destinationId: destination.destinationID,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'dataMapping.notification.activity.useAndPublic.disclosure.update'
            ) as string,
          });
        },
      });

    const {
      data: activityMeta,
      isLoading,
      isError,
    } = useGetActivityMeta({});

    useEffect(() => {
      form.setFieldsValue(destination);
    }, [destination, form]);

    if (isLoading) return <Skeleton active />;

    const transferData = activityMeta?.tranferData;
    const lawPDPA = activityMeta?.lawPDPA;
    const transferType = activityMeta?.tranferType;

    const transferDataOptions = transferData?.map(
      (item) => ({
        label: item.name,
        value: item.ObjectUUID,
      })
    );

    const lawPDPAOptions = lawPDPA?.map((item) => ({
      label: item.name,
      value: item.ObjectUUID,
    }));

    const tagItems = transferType?.map((item) => ({
      key: item.name,
      color: colors?.[item.name]?.color,
      label: colors?.[item.name]?.label,
    }));

    return (
      <FallbackError isError={isError}>
        <Descriptions
          column={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          layout="vertical"
          labelStyle={{
            fontWeight: 'bold',
          }}
        >
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.name" />
            }
          >
            {destination.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.email" />
            }
          >
            {destination.email}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.tel" />
            }
          >
            {destination.tel}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.address" />
            }
          >
            {destination.address}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.country" />
            }
          >
            {destination.country}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.url" />
            }
          >
            {destination.url}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.personalType" />
            }
          >
            {destination.personalType}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.actorType" />
            }
          >
            {destination.actorType}
          </Descriptions.Item>
        </Descriptions>
        <Typography.Title
          level={5}
          className="font-weight-bold font-size-md"
        >
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.dataTransferType" />{' '}
          :{' '}
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.disclosure" />
        </Typography.Title>
        <TagItems
          items={tagItems}
          tags={destination.tranferType}
          tagStyle={{
            letterSpacing: 1,
            fontWeight: 'bold',
            fontSize: 14,
            minWidth: 100,
            textAlign: 'center',
          }}
        />
        <Divider />
        <Form
          form={form}
          layout="vertical"
          onFinish={
            updateDisclosurePurposeDestinationOfActivity.submit
          }
        >
          {destination.tranferType?.includes(
            'transfer'
          ) && (
            <>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.legalPDPA" />
                }
                name="legalPDPA"
                // rules={[
                //   validation.required(
                //     'กรุณาเลือกกฏหมาย PDPA'
                //   ),
                // ]}
              >
                <Radio.Group options={lawPDPAOptions} />
              </Form.Item>
              <Divider />
            </>
          )}
          <Form.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.isDPA" />
            }
            name="isDPA"
            rules={[
              validation.required(
                t(
                  'dataMapping.activity.useAndPublic.disclosure.purpose.destination.isDPARequired'
                )
              ),
            ]}
          >
            <Radio.Group className="d-flex flex-column">
              <Radio value={false}>
                <IntlMessage id="dataMapping.purpose.detail.do_not_have" />
              </Radio>
              <Radio value={true}>
                <>
                  <Typography.Text>
                    <IntlMessage id="dataMapping.purpose.detail.have" />
                  </Typography.Text>
                  <Form.Item
                    shouldUpdate={(prev, current) =>
                      prev?.isDPA !== current?.isDPA
                    }
                    noStyle
                  >
                    {({ getFieldValue }) => {
                      if (!getFieldValue('isDPA'))
                        return null;
                      return (
                        <Form.Item
                          name="dpaUrl"
                          noStyle
                          rules={[
                            validation.required(
                              t(
                                'dataMapping.activity.useAndPublic.disclosure.purpose.destination.dpaUrlRequired'
                              )
                            ),
                          ]}
                        >
                          <UploadFiles
                            module="dataMapping"
                            group="activityPurposeDestination"
                            required
                          />
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                </>
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Divider />
          <Form.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.isPDSA" />
            }
            name="isPDSA"
            rules={[
              validation.required(
                t(
                  'dataMapping.activity.useAndPublic.disclosure.purpose.destination.isPDSARequired'
                )
              ),
            ]}
          >
            <Radio.Group className="d-flex flex-column">
              <Radio value={false}>
                <IntlMessage id="dataMapping.purpose.detail.do_not_have" />
              </Radio>
              <Radio value={true}>
                <>
                  <Typography.Text>
                    <IntlMessage id="dataMapping.purpose.detail.have" />
                  </Typography.Text>
                  <Form.Item
                    shouldUpdate={(prev, current) =>
                      prev?.isPDSA !== current?.isPDSA
                    }
                    noStyle
                  >
                    {({ getFieldValue }) => {
                      if (!getFieldValue('isPDSA'))
                        return null;
                      return (
                        <Form.Item
                          name="pdsaUrl"
                          noStyle
                          rules={[
                            validation.required(
                              t(
                                'dataMapping.activity.useAndPublic.disclosure.purpose.destination.dpaUrlRequired'
                              )
                            ),
                          ]}
                        >
                          <UploadFiles
                            module="dataMapping"
                            group="activityPurposeDestination"
                            required
                          />
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                </>
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Divider />
          <Row gutter={[24, 24]}>
            <Col {...getColLayout(12)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.destination.transferMethod" />
                }
                name="tranferMethod"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.activity.useAndPublic.disclosure.purpose.destination.transferMethodRequired'
                    )
                  ),
                ]}
              >
                <Select
                  mode="multiple"
                  options={transferDataOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          {destination.country !== 'ไทย' ? (
            <ActivityDisclosurePurposeDestinationMeasure
              activityId={activityId}
              purposeId={purposeId}
              destinationId={destination.destinationID}
            />
          ) : null}
          <Divider />
          <Form.Item>
            <Flex justifyContent="end">
              <Button
                type="primary"
                loading={
                  updateDisclosurePurposeDestinationOfActivity.isLoading
                }
                htmlType="submit"
                disabled={!editPermission.isAllow}
              >
                <IntlMessage id="dataMapping.activity.save" />
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </FallbackError>
    );
  };

export const ActivityDisclosurePurposeDestinationList = ({
  activityId,
  purposeId,
}: ActivityDisclosurePurposeDestinationListProps) => {
  const { data, isLoading, isError } =
    useListDisclosurePurposeDestinationOfActivity({
      activityId,
      purposeId,
    });

  if (isLoading) return <Skeleton active />;

  if (data?.data.length === 0) return null;

  const defaultActiveKey = data?.data.map(
    (destination) => destination.destinationID
  );

  return (
    <FallbackError isError={isError}>
      <Collapse defaultActiveKey={defaultActiveKey}>
        {data?.data.map(
          (
            destination: ActivityDisclosurePurposeDestination
          ) => {
            return (
              <Collapse.Panel
                header={destination.name}
                key={destination.destinationID}
              >
                <ActivityDisclosurePurposeDestinationDetail
                  activityId={activityId}
                  purposeId={purposeId}
                  destination={destination}
                />
              </Collapse.Panel>
            );
          }
        )}
      </Collapse>
    </FallbackError>
  );
};
