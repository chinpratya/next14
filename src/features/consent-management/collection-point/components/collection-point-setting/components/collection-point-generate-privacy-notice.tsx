import { PaperClipOutlined } from '@ant-design/icons';
import {
  Collapse,
  Typography,
  Switch,
  Row,
  Col,
  Form,
  Input,
  Select,
} from 'antd';
import _ from 'lodash';

import { UploadButton } from '@/features/shared';
import { getColLayout } from '@/utils';

import { useGetCollectionPointMeta } from '../../../api/get-collection-point-meta';

const { Panel } = Collapse;

export const CollectionPointGeneratePrivacyNotice =
  () => {
    const { data: meta } = useGetCollectionPointMeta();
    const displayOptions = _.map(
      meta?.displayType,
      (v) => {
        return {
          value: v.ObjectUUID,
          label: v.name,
        };
      }
    );
    const policyOptions = _.map(meta?.policyType, (v) => {
      return {
        value: v.ObjectUUID,
        label: v.name,
      };
    });
    const privacyOptions = _.map(
      meta?.relatePrivacyNotice,
      (v) => {
        return {
          value: v.ObjectUUID,
          label: v.name,
        };
      }
    );
    return (
      <>
        <Collapse
          defaultActiveKey={['1']}
          className="my-3"
        >
          <Panel
            header="Generate Privacy Notice"
            key={'1'}
          >
            <Row
              justify={'space-between'}
              align={'middle'}
              gutter={[10, 10]}
              className="mb-2"
            >
              <Col
                {...getColLayout([
                  24, 24, 15, 15, 15, 15,
                ])}
                style={{ wordWrap: 'break-word' }}
              >
                <Typography.Title level={4}>
                  Generate Privacy Notice
                </Typography.Title>
                <Typography.Text>
                  Send a confirmation email to each data
                  subject. The data subject identifier
                  should be the email address.
                </Typography.Text>
              </Col>
              <Col
                {...getColLayout([24, 24, 2, 2, 2, 2])}
              >
                <Form.Item
                  name={'isprivacyNotice'}
                  valuePropName="checked"
                >
                  <Switch
                    className="mt-3"
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              shouldUpdate={(prev, next) =>
                prev?.isprivacyNotice !==
                next?.isprivacyNotice
              }
              noStyle
            >
              {({ getFieldValue }) => {
                const show = getFieldValue(
                  'isprivacyNotice'
                );

                return show ? (
                  <>
                    <Form.Item
                      label="Select Policy and Privacy Notice"
                      name="policyTypeID"
                    >
                      <Select
                        options={policyOptions}
                        placeholder="Relate Policy and Privacy Notice"
                      />
                    </Form.Item>
                    <Form.Item
                      shouldUpdate={(prev, next) =>
                        prev?.policyTypeID !==
                        next?.policyTypeID
                      }
                      noStyle
                    >
                      {({ getFieldValue }) => {
                        const policyTypeID =
                          getFieldValue('policyTypeID');
                        //เช็คเงื่อนไขได้ต้องได้prolicyก่อน
                        return policyTypeID ? (
                          <>
                            <Form.Item
                              label="Relate Privacy Notice"
                              name="relatePrivacyNotice"
                            >
                              <Input placeholder="Existing Policy" />
                            </Form.Item>
                            <Form.Item
                              label="Relate Privacy Notice"
                              name={
                                'relatePrivacyNoticeID'
                              }
                            >
                              <Select
                                options={privacyOptions}
                                placeholder="Existing Policy"
                              />
                            </Form.Item>
                            <Form.Item
                              label="Display"
                              name="displayID"
                            >
                              <Select
                                options={displayOptions}
                                placeholder="Link Policy"
                              />
                            </Form.Item>
                            <Form.Item
                              label="Link Privacy Notice"
                              name={'linkPrivacy'}
                            >
                              <Input placeholder="Link Privacy Notice" />
                            </Form.Item>
                            <Form.Item
                              label="Version Privacy Notice"
                              name="privacyVersion"
                            >
                              <Input placeholder="Version Privacy Notice" />
                            </Form.Item>
                            <Form.Item label="Upload">
                              <UploadButton
                                module="consent"
                                group="collection-point-setting"
                                type={'default'}
                                label="Attachment"
                                icon={
                                  <PaperClipOutlined />
                                }
                              />
                            </Form.Item>
                          </>
                        ) : null;
                      }}
                    </Form.Item>
                  </>
                ) : null;
              }}
            </Form.Item>
          </Panel>
        </Collapse>
      </>
    );
  };
