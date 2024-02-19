import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
  EyeInvisibleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Droppable } from '@hello-pangea/dnd';
import { Card, Form, Skeleton, Typography } from 'antd';
import _ from 'lodash';
import { useCallback } from 'react';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import {
  ConsentFormItemSectionType,
  ConsentPurposeType,
  ConsentActivityType,
  ConsentPolicyType,
  ConsentActivityTypeItem,
} from '@/types';
import { Flex } from '@components/flex';
import {
  FormBuilder,
  FormItemType,
} from '@components/form-builder';
import { DragContent } from '@utilComponents/dnd';

import { ConsentBuilderActivityTypeWidget } from '../consent-builder-activity-type-widget';
import { ConsentBuilderActivityWidget } from '../consent-builder-activity-widget';
import { ConsentBuilderPolicyWidget } from '../consent-builder-policy-widget';
import { ConsentBuilderPurposeWidget } from '../consent-builder-purpose-widget';
import { ConsentBuilderRequestTypeDsarWidget } from '../consent-builder-request-type-dsar-widget';
import { ConsentBuilderRequestTypeWidget } from '../consent-builder-request-type-widget';

export const ConsentBuilderForm = () => {
  const {
    formItems,
    currentFormIndex,
    currentSectionId,
    onToggleSectionSetting,
    onChangeSelectedSection,
    onMoveUpSection,
    onMoveDownSection,
    onDeleteSection,
    onMoveUpComponent,
    onMoveDownComponent,
    onDeleteComponent,
    toggleFieldSetting,
    onToggleLabelSetting,
    onTogglePurposeSetting,
    toggleRequestTypeSetting,
    toggleRequestTypeDsarSetting,
    onToggleActivityTypeSetting,
  } = useConsentBuilderStore();

  const [form] = Form.useForm();

  const sections = _.get(
    formItems,
    `[${currentFormIndex}].sections`,
    []
  );

  const renderTypeField = useCallback(
    (component: Record<string, unknown>) => {
      const initialValue = component?.initialValue;
      form.setFieldsValue({
        [component?.name as string]: initialValue,
      });

      return (
        <FormBuilder
          form={form}
          isReadonly
          formItems={[
            component as unknown as FormItemType,
          ]}
        />
      );
    },
    [form]
  );

  return (
    <div
      className={css`
        .consent-builder-form-selected {
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);

          .ant-card-head {
            background-color: #fafafa;
            padding-bottom: 10px;

            .ant-card-extra {
              display: flex;
            }
          }
        }
      `}
    >
      <Form form={form} />
      {sections?.map(
        (section: ConsentFormItemSectionType, index) => {
          const isSelected =
            section.id === currentSectionId;

          const isDisabledSetting = _.get(
            section,
            ['properties', 'isDisabledSetting'],
            false
          );

          const isDisabledDelete = _.get(
            section,
            ['properties', 'isDisabledDelete'],
            false
          );

          return (
            <Card
              key={section.id}
              title={
                <Flex
                  alignItems="center"
                  className="mb-2"
                >
                  <Typography.Title
                    level={4}
                    className="font-weight-bold mb-0 mr-2"
                  >
                    {section.name}
                  </Typography.Title>
                  {section?.properties?.isHidden && (
                    <Typography.Text
                      type="secondary"
                      className="font-weight-light"
                    >
                      ซ่อนอยู่ <EyeInvisibleOutlined />
                    </Typography.Text>
                  )}
                </Flex>
              }
              className={
                isSelected
                  ? 'consent-builder-form consent-builder-form-selected'
                  : 'consent-builder-form'
              }
              extra={
                <div>
                  <CaretUpOutlined
                    className="ml-2"
                    onClick={() =>
                      onMoveUpSection(section.id)
                    }
                    hidden={index === 0}
                  />
                  <CaretDownOutlined
                    className="ml-2"
                    onClick={() =>
                      onMoveDownSection(section.id)
                    }
                    hidden={index === sections.length - 1}
                  />
                  {!isDisabledSetting && (
                    <SettingOutlined
                      className="ml-2"
                      onClick={() =>
                        onToggleSectionSetting(section.id)
                      }
                    />
                  )}
                  {!isDisabledDelete && (
                    <CloseOutlined
                      className="ml-2"
                      onClick={() =>
                        onDeleteSection(section.id)
                      }
                    />
                  )}
                </div>
              }
              onClick={() =>
                onChangeSelectedSection(section.id)
              }
            >
              <Droppable
                key={section.id}
                droppableId={section.id}
                type="field"
                direction="vertical"
              >
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      minHeight: '10px',
                    }}
                  >
                    {section.components?.map(
                      (
                        { properties, ...component },
                        index,
                        fields
                      ) => {
                        const key: string =
                          (component?.activityID as string) ??
                          (component?.purposeID as string) ??
                          (component?.name as string) ??
                          (component?.id as string);

                        const props = {
                          draggableId: `builder-${key}`,
                          index,
                          total: fields.length,
                          disabled:
                            snapshot.isDraggingOver,
                          onMoveUp: () =>
                            onMoveUpComponent(key),
                          onMoveDown: () =>
                            onMoveDownComponent(key),
                          onDelete: () =>
                            onDeleteComponent(key),
                          isDisabledSetting: _.get(
                            properties,
                            'isDisabledSetting',
                            false
                          ),
                          isDisabledDelete: _.get(
                            properties,
                            'isDisabledDelete',
                            false
                          ),
                        };

                        return (
                          <div
                            key={`${section.id}|${key}`}
                          >
                            {component.type ===
                              'loading' && (
                              <DragContent
                                key={key}
                                {...props}
                              >
                                <Skeleton active />
                              </DragContent>
                            )}
                            {(component.type ===
                              'field' ||
                              component.type ===
                                'identifier') && (
                              <DragContent
                                key={key}
                                {...props}
                                onSetting={() =>
                                  toggleFieldSetting(key)
                                }
                              >
                                {renderTypeField(
                                  component
                                )}
                              </DragContent>
                            )}
                            {component.type ===
                              'request-type' && (
                              <DragContent
                                key={key}
                                {...props}
                                onDelete={undefined}
                                onSetting={() =>
                                  toggleRequestTypeSetting(
                                    key
                                  )
                                }
                              >
                                <ConsentBuilderRequestTypeWidget
                                  form={form}
                                  component={component}
                                />
                              </DragContent>
                            )}
                            {component.type ===
                              'request-type-dsar' && (
                              <DragContent
                                key={key}
                                {...props}
                                onDelete={undefined}
                                onSetting={() =>
                                  toggleRequestTypeDsarSetting(
                                    key
                                  )
                                }
                              >
                                <ConsentBuilderRequestTypeDsarWidget
                                  form={form}
                                  component={component}
                                />
                              </DragContent>
                            )}
                            {component.type ===
                              'purpose' && (
                              <DragContent
                                key={key}
                                {...props}
                                onSetting={() =>
                                  onTogglePurposeSetting(
                                    key
                                  )
                                }
                              >
                                <ConsentBuilderPurposeWidget
                                  purpose={
                                    component as unknown as ConsentPurposeType
                                  }
                                />
                              </DragContent>
                            )}
                            {component.type ===
                              'policy' && (
                              <DragContent
                                key={key}
                                {...props}
                              >
                                <ConsentBuilderPolicyWidget
                                  policy={
                                    component as unknown as ConsentPolicyType
                                  }
                                />
                              </DragContent>
                            )}
                            {component.type ===
                              'activity' && (
                              <DragContent
                                key={key}
                                {...props}
                              >
                                <ConsentBuilderActivityWidget
                                  activity={
                                    component as unknown as ConsentActivityType
                                  }
                                />
                              </DragContent>
                            )}
                            {component.type ===
                              'label' && (
                              <DragContent
                                key={key}
                                {...props}
                                onSetting={() =>
                                  onToggleLabelSetting(
                                    key
                                  )
                                }
                              >
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      component.value as string,
                                  }}
                                />
                              </DragContent>
                            )}
                            {component.type ===
                              'activity-type' && (
                              <DragContent
                                key={key}
                                {...props}
                                onSetting={() =>
                                  onToggleActivityTypeSetting(
                                    key
                                  )
                                }
                              >
                                <ConsentBuilderActivityTypeWidget
                                  form={form}
                                  component={
                                    component as unknown as ConsentActivityTypeItem
                                  }
                                />
                              </DragContent>
                            )}
                          </div>
                        );
                      }
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          );
        }
      )}
    </div>
  );
};
