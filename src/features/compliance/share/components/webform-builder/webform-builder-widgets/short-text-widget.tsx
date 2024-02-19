import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useSetState } from '@mantine/hooks';
import { Button, Col, Input, Row } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';

import { getColLayout } from '@/utils';
import { Flex } from '@components/flex';

import { UploadButton } from '../../../../../shared';
// eslint-disable-next-line import/no-cycle
import { useAssessmentAutomationStore } from '../../../stores';
import {
  WebformBuilderItem,
  WebformBuilderLongTextOption,
} from '../../../types/webform-builder';

import { WidgetBodyWrapper } from './widget-body-wrapper';
import { WidgetFooter } from './widget-footer';
import { WidgetHeader } from './widget-header';

export type ShortTextWidgetValue = {
  textValues: string[];
  attachmentValues: string[];
};

const specialChoices = [
  '7cbd6e18-2654-4cd1-9106-12512f0d50c5',
  '01c798b4-b1d3-41a1-b2f8-80c715ad4f8b',
  'e3ec231a-4ace-4ecc-9142-1a3d4860031b',
];

// d7f1c8ec-d1ee-47a1-9d4d-3a9f651008ad
const specialValidation = (
  fields: WebformBuilderItem[],
  value: string
): boolean => {
  const field = fields?.[6]?.children?.find(
    (item) =>
      item.key === 'd7f1c8ec-d1ee-47a1-9d4d-3a9f651008ad'
  );

  const fieldValue = _.get(
    field,
    'value.textValues[0]',
    undefined
  ) as string | undefined;

  if (!fieldValue) {
    return true;
  }

  if (parseInt(value) > parseInt(fieldValue)) {
    return false;
  }

  return true;
};

export type ShortTextWidgetProps = WebformBuilderItem & {
  fields: WebformBuilderItem[];
};

export const ShortTextWidget = ({
  title,
  description,
  options,
  addOption,
  maxOption,
  verticalAlignment,
  readOnly,
  value: initialValue,
  fields,
}: ShortTextWidgetProps) => {
  const { selectedFormKey, onChangeFormItem } =
    useAssessmentAutomationStore();

  const [shortTextValue, setShortTextValue] =
    useSetState<ShortTextWidgetValue>({
      textValues: [],
      attachmentValues: [],
    });

  const onAddOption = () => {
    const newOptions = [
      ...(options ?? []),
      {
        additional: true,
        placeholder: 'โปรดระบุ',
        title: `โปรดระบุ-${options?.length}`,
      },
    ];

    onChangeFormItem({
      options: newOptions,
    });
  };

  const onValidate = async () => {
    return new Promise<Record<string, unknown>>(
      (resolve, reject) => {
        Object.entries(options ?? {}).forEach(
          ([index, option]) => {
            _.get(option, 'rules', []).forEach(
              ({
                regex,
                errorMessage,
              }: {
                regex: string;
                errorMessage: string;
              }) => {
                if (
                  !new RegExp(regex).test(
                    _.get(
                      shortTextValue.textValues,
                      `${index}`
                    )
                  )
                ) {
                  reject(errorMessage);
                }
              }
            );

            if (
              specialChoices.includes(selectedFormKey)
            ) {
              if (
                !specialValidation(
                  fields,
                  _.get(
                    shortTextValue.textValues,
                    `${index}`
                  )
                )
              ) {
                reject(
                  'ไม่สามารถกรอกข้อมูลเกินข้อ 6.1.1'
                );
              }
            }

            if (
              !_.get(
                shortTextValue.textValues,
                `${index}`
              )
            ) {
              reject(`กรุณาระบุ ${option.placeholder}`);
            }
            if (
              option.attachment &&
              !_.get(
                shortTextValue.attachmentValues,
                `${index}`
              )
            ) {
              reject(
                `กรุณาแนบหลักฐาน ${option.placeholder}`
              );
            }
          }
        );

        resolve(shortTextValue);
      }
    );
  };

  useEffect(() => {
    if (initialValue) {
      setShortTextValue(initialValue);
    }
  }, [initialValue, setShortTextValue]);

  const optionLength = options?.length ?? 0;

  return (
    <>
      <WidgetHeader
        title={title}
        description={description}
      />
      <WidgetBodyWrapper readOnly={readOnly}>
        <div className="mt-4 mb-4">
          {options?.map(
            (
              option: WebformBuilderLongTextOption,
              index: number
            ) => (
              <Row
                key={index}
                justify="space-between"
                className="mb-2"
                gutter={16}
                align="middle"
              >
                <Col
                  {...getColLayout(
                    option?.attachment &&
                      !verticalAlignment
                      ? 18
                      : 24
                  )}
                >
                  <Flex
                    justifyContent="start"
                    alignItems="center"
                  >
                    <Input
                      disabled={readOnly}
                      placeholder={option.placeholder}
                      style={{
                        width: '90%',
                      }}
                      value={
                        shortTextValue.textValues?.[index]
                      }
                      onChange={(e) => {
                        const { value } = e.target;
                        const textValues = [
                          ...shortTextValue.textValues,
                        ];
                        textValues[index] = value;
                        setShortTextValue({
                          textValues,
                        });
                      }}
                    />
                    <DeleteOutlined
                      className="text-danger ml-2"
                      onClick={() => {
                        const newOptions = [
                          ...(options ?? []),
                        ];
                        newOptions.splice(index, 1);
                        onChangeFormItem({
                          options: newOptions,
                        });
                      }}
                      hidden={!option?.additional}
                    />
                  </Flex>
                  {_.get(
                    option,
                    'additionalDescription'
                  ) && (
                    <div className="mt-2 text-gray-light">
                      {_.get(
                        option,
                        'additionalDescription'
                      )}
                    </div>
                  )}
                </Col>
                <Col
                  {...getColLayout(
                    option?.attachment &&
                      verticalAlignment
                      ? 24
                      : option?.attachment &&
                        !verticalAlignment
                      ? 6
                      : 0
                  )}
                  hidden={!option?.attachment}
                >
                  <UploadButton
                    disabled={readOnly}
                    module="portal-assessment-automation"
                    group="portal-webform"
                    label="แนบหลักฐาน"
                    value={
                      shortTextValue.attachmentValues?.[
                        index
                      ]
                    }
                    onChange={(value) => {
                      const attachmentValues = [
                        ...shortTextValue.attachmentValues,
                      ];
                      attachmentValues[index] =
                        value as string;
                      setShortTextValue({
                        attachmentValues,
                      });
                    }}
                  />
                </Col>
              </Row>
            )
          )}
          {addOption && (
            <Button
              disabled={readOnly}
              icon={<PlusOutlined />}
              type="link"
              className="p-0"
              onClick={onAddOption}
              hidden={
                maxOption !== undefined &&
                optionLength >= maxOption
              }
            >
              เพิ่มตัวเลือก
            </Button>
          )}
        </div>
      </WidgetBodyWrapper>
      <WidgetFooter
        readonly={readOnly}
        onValidate={onValidate}
      />
    </>
  );
};
